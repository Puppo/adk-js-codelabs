import type { Conference } from "./conferenceSchema.js";
import type { Schedule } from "./scheduleSchema.js";
import type { Speakers } from "./speakersSchema.js";

export function conferenceToMarkdown(conference: Conference): string {
  const { venue, sponsors } = conference;
  return `# ${conference.conference_name}

**Theme:** ${conference.theme}
**Date:** ${conference.start_time} – ${conference.end_time}

## Venue

**${venue.name}**
${venue.address}

${venue.description}

### Directions

- **By train:** ${venue.directions.by_train}
- **By plane:** ${venue.directions.by_plane}
- **By car:** ${venue.directions.by_car}

## Organizers

${conference.organizers.map((o) => `- ${o}`).join("\n")}

## Sponsors

**Main:** ${sponsors.main.join(", ")}
**Diamond:** ${sponsors.diamond.join(", ")}
**Silver:** ${sponsors.silver.join(", ")}`;
}

export function speakersToMarkdown(speakers: Speakers): string {
  const entries = speakers.map(
    (s) => `### ${s.name}\n\n**${s.heading}**\n\n${s.bio}`,
  );
  return `# Speakers\n\n${entries.join("\n\n---\n\n")}`;
}

export function scheduleToMarkdown(schedule: Schedule): string {
  const header = "| Time | Speaker | Talk Title | Room |\n| --- | --- | --- | --- |";
  const rows = schedule.map(
    (e) =>
      `| ${e.start_time} – ${e.end_time} | ${e.speaker} | ${e["talk title"]} | ${e.room} |`,
  );
  return `# Schedule\n\n${header}\n${rows.join("\n")}`;
}
