import { Activity } from "../model/types";
import { API_URL } from '../../../../constants/apiConfig';

const MONTH_INDEX: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

const parseActivityDate = (date: string) => {
  const normalized = date.replace(",", "");
  const parts = normalized.split(/\s+/);
  const day = Number(parts[1]);
  const month = MONTH_INDEX[parts[2]?.toLowerCase()];
  const year = Number(parts[3]);

  if (
    Number.isNaN(day) ||
    month === undefined ||
    Number.isNaN(year)
  ) {
    return Number.POSITIVE_INFINITY;
  }

  return new Date(year, month, day).getTime();
};

const sortByNearestUpcomingDate = (
  activities: Activity[]
) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return [...activities].sort((a, b) => {
    const dateA = parseActivityDate(a.date);
    const dateB = parseActivityDate(b.date);
    const aIsPast = dateA < today.getTime();
    const bIsPast = dateB < today.getTime();

    if (aIsPast !== bIsPast) {
      return aIsPast ? 1 : -1;
    }

    return aIsPast
      ? dateB - dateA
      : dateA - dateB;
  });
};

// Cache structure for storing search results
interface CacheEntry {
  timestamp: number;
  data: Activity[];
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

// In-memory cache with TTL (5 minutes)
const CACHE_TTL = 5 * 60 * 1000;
const searchCache: Map<string, CacheEntry> = new Map();

function getCacheKey(search?: string, category?: string): string {
  return `search:${search || ''}_category:${category || ''}`;
}

function getCachedResult(key: string): CacheEntry | null {
  const entry = searchCache.get(key);
  if (!entry) return null;

  // Check if cache has expired
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    searchCache.delete(key);
    return null;
  }

  return entry;
}

function cacheResult(key: string, data: Activity[], pagination: any): void {
  searchCache.set(key, {
    timestamp: Date.now(),
    data,
    pagination,
  });
}

// Track active requests for cancellation
let activeController: AbortController | null = null;

/**
 * Fetch activities with pagination, caching, and request cancellation support
 * @param search Search query
 * @param category Category filter
 * @param page Page number (default: 1)
 * @param perPage Results per page (default: 20)
 */
export const fetchActivities = async (
  search?: string,
  category?: string,
  page: number = 1,
  perPage: number = 20
): Promise<{ activities: Activity[]; pagination: any }> => {
  try {
    // Cancel previous request if still pending
    if (activeController) {
      activeController.abort();
    }
    activeController = new AbortController();

    const cacheKey = getCacheKey(search, category);

    // Check cache first (only for page 1)
    if (page === 1) {
      const cached = getCachedResult(cacheKey);
      if (cached) {
        console.log('[SEARCH] Cache hit for:', cacheKey);
        return {
          activities: cached.data,
          pagination: cached.pagination,
        };
      }
    }

    // Build query string with pagination
    const params = new URLSearchParams();
    if (search && search.trim()) {
      params.append('search', search.trim());
    }
    if (category && category !== 'All' && category.trim()) {
      params.append('category', category.trim());
    }
    params.append('page', page.toString());
    params.append('per_page', perPage.toString());

    const queryString = params.toString();
    const url = queryString ? `${API_URL}/activities?${queryString}` : `${API_URL}/activities`;

    console.log('[SEARCH] Fetching:', url);

    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: activeController.signal,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch activities (HTTP ${response.status})`);
    }

    const payload = await response.json();
    
    // Extract data array from response (new paginated format vs old format)
    let data: any[] = [];
    let paginationData: any = {};
    
    if (payload.data && Array.isArray(payload.data)) {
      // New paginated format: { data: [...], total, per_page, current_page, last_page }
      data = payload.data;
      paginationData = {
        total: payload.total || data.length,
        per_page: payload.per_page || perPage,
        current_page: payload.current_page || 1,
        last_page: payload.last_page || 1,
      };
    } else if (Array.isArray(payload)) {
      // Old format: just array
      data = payload;
      paginationData = {
        total: data.length,
        per_page: perPage,
        current_page: 1,
        last_page: 1,
      };
    } else {
      // Unexpected format, default to empty
      console.warn('[SEARCH] Unexpected API response format:', payload);
      data = [];
      paginationData = { total: 0, per_page: perPage, current_page: 1, last_page: 1 };
    }

    console.log('[SEARCH] Extracted data array length:', data.length);

    // Map backend response to frontend Activity interface
    const activities = data.map((act: any) => ({
      id: act.id,
      title: act.title,
      image: act.image ? { uri: act.image } : require('../../../../../assets/images/activity-placeholder/seminarAntiNarkoba.jpeg'),
      type: act.type,
      points: act.points,
      date: act.date,
    }));

    const sorted = sortByNearestUpcomingDate(activities);

    // Cache only first page
    if (page === 1) {
      cacheResult(cacheKey, sorted, paginationData);
    }

    return {
      activities: sorted,
      pagination: paginationData,
    };
  } catch (error) {
    // Don't log abort errors as they're expected when searching rapidly
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('[SEARCH] Request cancelled');
      return { activities: [], pagination: {} };
    }
    console.error('[SEARCH] Error fetching activities:', error);
    throw error;
  }
};

/**
 * Clear search cache (useful for manual refresh)
 */
export const clearSearchCache = (): void => {
  searchCache.clear();
  console.log('[SEARCH] Cache cleared');
};

