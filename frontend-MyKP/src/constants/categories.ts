export interface CategoryConfig {
  label: string;

  claimType: "auto" | "manual";

  claimConfig: {
    title: string;
    method: string;
    description: string;
    checklist: string[];
    note?: string;
  };
}

export const CATEGORIES: CategoryConfig[] = [
  {
    label: "Organisasi",
    claimType: "auto",
    claimConfig: {
      title: "How to Claim KP",
      method: "Autoinput oleh BMA",
      description:
        "KP organisasi akan diproses secara otomatis oleh BMA berdasarkan data kepengurusan atau keaktifan mahasiswa dalam organisasi.",
      checklist: [
        "Mahasiswa tidak perlu melakukan request manual",
        "Pastikan terdaftar sebagai pengurus atau anggota aktif",
        "KP akan diproses oleh BMA secara berkala",
        "Hubungi BMA jika poin belum muncul",
      ],
      note:
        "Berlaku untuk Student Union, Student Council, INFINITY, serta kepengurusan dan keanggotaan UKM.",
    },
  },

  {
    label: "Kepanitiaan",
    claimType: "auto",
    claimConfig: {
      title: "How to Claim KP",
      method: "Autoinput oleh BMA",
      description:
        "KP kepanitiaan akan diproses otomatis oleh BMA berdasarkan data kepanitiaan yang terdaftar.",
      checklist: [
        "Mahasiswa tidak perlu melakukan request manual",
        "Pastikan nama terdaftar pada susunan panitia",
        "KP akan diinput setelah kegiatan selesai",
        "Konfirmasi ke penanggung jawab jika terjadi kendala",
      ],
      note: "Termasuk panitia O-Week, Entrance, Ad-Hoc, dan relawan kegiatan.",
    },
  },

  {
    label: "Talkshow Wajib",
    claimType: "auto",
    claimConfig: {
      title: "How to Claim KP",
      method: "Autoinput oleh BMA",
      description:
        "KP akan diberikan otomatis berdasarkan data kehadiran mahasiswa pada kegiatan wajib.",
      checklist: [
        "Tidak perlu melakukan klaim mandiri",
        "Pastikan kehadiran tercatat",
        "KP diproses otomatis oleh BMA",
        "Hubungi BMA jika poin belum muncul",
      ],
      note:
        "Termasuk kegiatan wajib seperti talkshow BMA, mentoring, dan upacara tertentu.",
    },
  },

  {
    label: "Kompetisi",
    claimType: "manual",
    claimConfig: {
      title: "How to Claim KP",
      method: "Request Mandiri",
      description:
        "Mahasiswa wajib melakukan pengajuan KP secara mandiri melalui sistem CIS dengan mengunggah bukti kompetisi.",
      checklist: [
        "Siapkan sertifikat atau piagam kompetisi",
        "Lakukan request KP melalui CIS",
        "Unggah dokumen pendukung",
        "Tunggu verifikasi dari BMA",
      ],
      note: "Berlaku untuk peserta, finalis, maupun juara kompetisi.",
    },
  },

  {
    label: "Pengabdian Masyarakat",
    claimType: "manual",
    claimConfig: {
      title: "How to Claim KP",
      method: "Request Mandiri",
      description:
        "Mahasiswa perlu melakukan pengajuan KP dengan melampirkan bukti kegiatan pengabdian masyarakat.",
      checklist: [
        "Siapkan sertifikat atau surat tugas",
        "Lakukan request melalui CIS",
        "Unggah bukti kegiatan",
        "Tunggu proses verifikasi BMA",
      ],
      note:
        "Termasuk kegiatan sosial, volunteer, dan pengabdian komunitas.",
    },
  },

  {
    label: "Penelitian",
    claimType: "manual",
    claimConfig: {
      title: "How to Claim KP",
      method: "Request Mandiri",
      description:
        "Kegiatan penelitian dan publikasi memerlukan pengajuan mandiri melalui sistem KP.",
      checklist: [
        "Siapkan bukti penelitian atau publikasi",
        "Unggah dokumen pendukung",
        "Lakukan request KP melalui CIS",
        "Tunggu proses verifikasi BMA",
      ],
      note:
        "Termasuk jurnal, prosiding, PKM, HKI, dan publikasi ilmiah lainnya.",
    },
  },

  {
    label: "Lain-lain",
    claimType: "manual",
    claimConfig: {
      title: "How to Claim KP",
      method: "Request Mandiri",
      description:
        "Mahasiswa perlu melakukan pengajuan KP secara mandiri sesuai ketentuan BMA.",
      checklist: [
        "Siapkan bukti kegiatan",
        "Unggah dokumen pendukung",
        "Lakukan request melalui CIS",
        "Tunggu verifikasi dari BMA",
      ],
      note:
        "Jika kegiatan dilakukan secara kolektif, BMA dapat melakukan input massal.",
    },
  },
];

export const CATEGORY_LABELS = CATEGORIES.map((c) => c.label);

export type CategoryLabel = (typeof CATEGORY_LABELS)[number];