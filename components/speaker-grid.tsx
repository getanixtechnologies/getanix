"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { speakers, categories } from "@/data/speakers";
import { SpeakerCard } from "./speaker-card";
export function SpeakerGrid() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [country, setCountry] = useState("All countries");
  const [count, setCount] = useState(6);
  const results = speakers.filter(
    (s) =>
      (category === "All" || s.category === category) &&
      (country === "All countries" || s.country === country) &&
      (s.name + " " + s.role).toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <div className="directory-tools">
        <div className="search-input">
          <Search size={18} />
          <input
            aria-label="Search speakers"
            placeholder="Find a voice, a name, an idea…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCount(6);
            }}
          />
        </div>
        <select
          aria-label="Filter by country"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setCount(6);
          }}
        >
          {["All countries", ...new Set(speakers.map((s) => s.country))].map(
            (c) => (
              <option key={c}>{c}</option>
            ),
          )}
        </select>
      </div>
      <div className="filter-tabs" aria-label="Filter speakers by category">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            aria-pressed={category === c}
            onClick={() => {
              setCategory(c);
              setCount(6);
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="results-count" role="status">
        {results.length} sample {results.length === 1 ? "profile" : "profiles"}
      </p>
      {results.length ? (
        <div className="speaker-grid">
          {results.slice(0, count).map((speaker, i) => (
            <SpeakerCard key={speaker.id} speaker={speaker} index={i} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No voices found.</h2>
          <p>Try another name, category or country.</p>
          <button
            className="button button-outline"
            onClick={() => {
              setSearch("");
              setCategory("All");
              setCountry("All countries");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
      {results.length > count && (
        <div className="center">
          <button
            className="button button-outline"
            onClick={() => setCount(count + 6)}
          >
            Load more voices
          </button>
        </div>
      )}
    </>
  );
}
