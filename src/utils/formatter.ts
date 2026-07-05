/**
 * Formats a raw numeric string into CNIC format: XXXXX-XXXXXXX-X
 */
export function formatCNIC(value: string): string {
  const nums = value.replace(/\D/g, '').slice(0, 13);
  if (nums.length <= 5) return nums;
  if (nums.length <= 12) return `${nums.slice(0, 5)}-${nums.slice(5)}`;
  return `${nums.slice(0, 5)}-${nums.slice(5, 12)}-${nums.slice(12, 13)}`;
}

/**
 * Formats a raw numeric string into mobile number format: 03XX-XXXXXXX
 */
export function formatMobile(value: string): string {
  const nums = value.replace(/\D/g, '').slice(0, 11);
  if (nums.length <= 4) return nums;
  return `${nums.slice(0, 4)}-${nums.slice(4)}`;
}
