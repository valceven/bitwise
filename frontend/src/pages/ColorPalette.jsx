export default function ColorPalette() {
  const colors = [
    { name: "greenz", hex: "#27AE60" },
    { name: "darkpurple", hex: "#9B51E0" },
    { name: "bluez", hex: "#6E61FF" },
    { name: "yellowz", hex: "#F2C94C" },
    { name: "cyanz", hex: "#56CCF2" },
    { name: "grayz", hex: "#29314D" },
    { name: "orangez", hex: "#F2994A" },
    { name: "lightpurple", hex: "#DAC3FF" },
    { name: "offwhite", hex: "#F1F6F1" },
    { name: "redz", hex: "#F14E3A" },
    { name: "white", hex: "#FFFFFF" },
    { name: "blackz", hex: "#031926" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-8  max-w-lg mx-auto bg-redz">
      {colors.map((color) => (
        <div
          key={color.hex}
          className="flex justify-center items-center w-32 h-16 rounded-lg border border-black"
          style={{ backgroundColor: color.hex }}
        >
          <span
            className="text-sm font-bold"
            style={{ color: color.hex === "#FFFFFF" ? "black" : "white" }}
          >
            {color.name}
          </span>
        </div>
      ))}
    </div>
  );
}
