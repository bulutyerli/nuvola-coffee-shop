import ReactCountryFlag from "react-country-flag";

export default function StoreFlags({ country }) {
  return (
    <div className="flex flex-col gap-3 items-center text-xs">
      <ReactCountryFlag
        svg
        style={{
          width: "5em",
          height: "auto",
          borderRadius: "2em",
        }}
        countryCode={country}
      />
      <h3 className="text-neutral-200">
        {country === "TR"
          ? "Istanbul / Turkiye"
          : country === "US"
          ? "New York / USA"
          : country === "GR"
          ? "Athens / Greece"
          : "London / England"}
      </h3>
    </div>
  );
}
