/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true }, // ※Firebase Storageの画像を扱うため維持（あるいはdomains追加）
};
export default nextConfig;