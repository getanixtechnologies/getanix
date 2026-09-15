import { MapPin, ArrowUpRight } from "lucide-react";
import { venue } from "@/data/venue";
export function VenueMap() {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  return (
    <div className="venue-map">
      {key ? (
        <iframe
          title="Map of Asramam Maidan, Kollam"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={
            "https://www.google.com/maps/embed/v1/place?key=" +
            encodeURIComponent(key) +
            "&q=Asramam+Maidan+Kollam"
          }
          allowFullScreen
        />
      ) : (
        <>
          <div className="map-water">
            <span>ASHTAMUDI LAKE</span>
          </div>
          <div className="map-road road-one" />
          <div className="map-road road-two" />
          <div className="map-road road-three" />
          <span className="map-label">KOLLAM</span>
          <div className="map-pin">
            <MapPin size={32} fill="currentColor" />
            <strong>
              Asramam Maidan<small>Festival grounds</small>
            </strong>
          </div>
          <span className="map-caption">Illustrative location map</span>
        </>
      )}
      <a
        href={venue.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="map-open"
        aria-label="Open venue in Google Maps"
      >
        <ArrowUpRight size={20} />
      </a>
    </div>
  );
}
