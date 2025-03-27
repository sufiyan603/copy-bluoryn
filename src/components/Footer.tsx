export default function Footer() {
  return (
    <footer className="bg-[#05668d] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">About us</h3>
            <p className="text-white/80">
              Bluoryn is the global study choice platform, helping students to find and compare Master's degrees worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Study abroad</h4>
            <ul className="space-y-2 text-white/80">
              <li>Master's degrees</li>
              <li>Universities</li>
              <li>Countries</li>
              <li>Disciplines</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Student resources</h4>
            <ul className="space-y-2 text-white/80">
              <li>Application guide</li>
              <li>Student visa guide</li>
              <li>Scholarship guide</li>
              <li>Student housing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact & support</h4>
            <ul className="space-y-2 text-white/80">
              <li>About us</li>
              <li>Contact us</li>
              <li>Privacy policy</li>
              <li>Terms of use</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}