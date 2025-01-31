export default function StudentHeader() {
  return (
    <div className="flex justify-between items-center p-4 w-full">
      <img
        src="/sait-logo.png"
        alt="sait-logo"
        className="border-2 rounded-xl border-saitLightBlue w-10 h-10"
      />

      <img src="/setting.png" alt="setting-icon" className="w-6 h-6" />
    </div>
  );
}
