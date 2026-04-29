import BottomNav from "../components/BottomNav";

export default function AccessPage() {
  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0b0f1a] to-black" />
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <img
            src="/social.png"
            alt="Social proof"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>
      <BottomNav prev="/logline" next="/sizzle" step="03 / 08" />
    </>
  );
}
