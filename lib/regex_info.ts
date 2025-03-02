import React from "react";

import {
	CodeXml,
	Hash,
	Link,
	LocateFixed,
	Mail,
	NotebookText,
	Palette,
	PlaneTakeoff,
	SquareAsterisk,
	Calendar,
	FileText,
	Phone,
	BadgeDollarSign,
} from "lucide-react";

export type RegexInfo = {
	regex: string; title: string; description: string; icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const regexInfo: RegexInfo[] = [{
	regex: "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$",
	title: "Password Strength",
	description: "at least 8 characters, one uppercase, one lowercase, one number, one special character",
	icon: SquareAsterisk,
}, {
	regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
	title: "Email Address",
	description: "Validates a typical email address.",
	icon: Mail,
}, {
	regex: "^https?://(www.)?[a-zA-Z0-9.-]+.[a-zA-Z]{2,}(/S*)?$",
	title: "URL",
	description: "Matches HTTP/HTTPS URLs.",
	icon: Link,
}, {
	regex: "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
	title: "IP Address (IPv4)",
	description: "Validates IPv4 addresses.",
	icon: LocateFixed,
}, {
	regex: "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$",
	title: "Hex Color",
	description: "Matches hexadecimal color codes (#FFFFFF or #FFF).",
	icon: Palette,
}, {
	regex: "<([a-zA-Z]+)([^<]+)*(?:>(.*)</\\1>|s+/>)",
	title: "Extracting HTML Tags",
	description: "Matches and extracts HTML tags and their contents.",
	icon: CodeXml,
}, {
	regex: "^[A-PR-WY][1-9]ds?d{4}[1-9]$",
	title: "Passport Number",
	description: "Matches Passport Numbers.",
	icon: PlaneTakeoff,
}, {
	regex: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
	title: "Slug",
	description: "Matches slugs (strings with only lowercase letters, numbers, and hyphens).",
	icon: NotebookText,
}, {
	regex: "^(0[1-9]|1[0-2])/([0-2][0-9]|3[01])/d{4}$",
	title: "Date (MM/DD/YYYY)",
	description: "Matches dates in the format MM/DD/YYYY.",
	icon: Calendar,
}, {
	regex: "^d{3}-d{2}-d{4}$",
	title: "Social Security Number",
	description: "Matches US Social Security Numbers (SSN).",
	icon: FileText,
}, {
	regex: "^(\\+\\d{1,3}[- ]?)?(\\d{3})[- ]?\\d{3}[- ]?\\d{4}$",
	title: "Phone Number",
	description: "Matches US phone numbers with optional country code.",
	icon: Phone,
}, {
	regex: "^d{5}(-d{4})?$",
	title: "ZIP Code",
	description: "Matches US ZIP codes with optional 4-digit extension.",
	icon: Hash,
}, {
	regex: "^[$]?[0-9,]+(.[0-9]{2})?$",
	title: "Currency",
	description: "Matches currency amounts in dollars (e.g., $1,234.56).",
	icon: BadgeDollarSign,
},] as const;
