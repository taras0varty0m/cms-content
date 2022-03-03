import { Event } from "src/events/entities/event.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";
import { Screen } from "src/screens/entities/screen.entity";
import { define, factory } from "typeorm-seeding";

define(Screen, () => {
  const screen = new Screen();
  screen.event = factory(Event)() as any;
  screen.playlist = factory(Playlist)() as any;
  return screen;
});
