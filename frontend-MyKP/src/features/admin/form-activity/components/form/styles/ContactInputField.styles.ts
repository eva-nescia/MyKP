import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export const styles = StyleSheet.create({
    contactPrefix: {
            height: 50,

            paddingHorizontal: 14,

            borderRadius: 999,

            backgroundColor: "#FFF7ED",

            justifyContent: "center",
            alignItems: "center",

            marginRight: 10,
        },

        contactPrefixText: {
            fontSize: 14,
            fontWeight: FONT_WEIGHT.semiBold,

            color: COLORS.primary,
        },
    },
)