// Import the song cover images
import playlist from '../images/1.png';
import songImage2 from '../images/2.png';
import songImage3 from '../images/3.png';
import songImage4 from '../images/4.png';
import songImage5 from '../images/5.png';
import songImage6 from '../images/6.png';
import songImage7 from '../images/7.png';
import songImage8 from '../images/8.png';
import songImage9 from '../images/9.png';
import songImage10 from '../images/10.png';
import songImage11 from '../images/11.png';
import songImage12 from '../images/12.png';
import songImage13 from '../images/13.png';
import songImage14 from '../images/14.png';
import songImage15 from '../images/15.png';
import songImage16 from '../images/16.png';
import songImage17 from '../images/17.png';
import songImage18 from '../images/18.png';
import songImage19 from '../images/19.png';
import songImage20 from '../images/20.png';
import songImage21 from '../images/21.png';
import playlist1 from '../images/playlist1.png';
import playlist2 from '../images/playlist2.png';
import playlist3 from '../images/playlist3.png';
import playlist4 from '../images/playlist4.png';
import playlist5 from '../images/playlist5.png';
import playlist6 from '../images/playlist6.png';
import playlist7 from '../images/playlist7.png';
import playlist8 from '../images/playlist8.png';



// Random function to generate likes
const generateLikes = () => Math.floor(Math.random() * 100) + 1; // Random likes between 1 and 100

// Define the array of saved songs
export const savedSongs = [
    { id: 1, title: "act ii: date @ 8", album:"act ii: date @ 8", artist: "4batz", likes: generateLikes(), cover: playlist },
    { id: 2, title: "First Person Shooter", album:"For All the Dogs", artist: "Drake", likes: generateLikes(), cover: songImage2 },
    { id: 3, title: "Free Mind", album:"For Broken Ears", artist: "Tems", likes: generateLikes(), cover: songImage3 },
    { id: 4, title: "Mercury", album:"Gemini Rights", artist: "Steve Lacey", likes: generateLikes(), cover: songImage4 },
    { id: 5, title: "I Wonder", album:"Graduation", artist: "Kanye West", likes: generateLikes(), cover: songImage5 },
    { id: 6, title: "The World Is Yours", album:"Illmatic", artist: "Nas", likes: generateLikes(), cover: songImage6 },
    { id: 7, title: "Forever Yours", album:"Larger Than Life", artist: "Brent Faiyaz", likes: generateLikes(), cover: songImage7 },
    { id: 8, title: "Can I See You Tonight?", album:"Let's Skip The Wedding", artist: "Eyedress", likes: generateLikes(), cover: songImage8 },
    { id: 9, title: "Slow Motion", album:"Lovesick", artist: "Don Toliver", likes: generateLikes(), cover: songImage9 },
    { id: 10, title: "Dope Lovers", album:"Moodswings into Order", artist: "DPR IAN", likes: generateLikes(), cover: songImage10 },
    { id: 11, title: "today also", album:"natural high", artist: "nafla", likes: generateLikes(), cover: songImage11 },
    { id: 12, title: "Sanctuary", album:"Nectar", artist: "Joji", likes: generateLikes(), cover: songImage12 },
    { id: 13, title: "Playlist", album:"Playlist", artist: "DPR LIVE", likes: generateLikes(), cover: songImage13 },
    { id: 14, title: "3500", album:"Rodeo", artist: "Travis Scott", likes: generateLikes(), cover: songImage14 },
    { id: 15, title: "Drugstore", album:"Simple.", artist: "IDK", likes: generateLikes(), cover: songImage15 },
    { id: 16, title: "Kill Bill", album:"SOS", artist: "SZA", likes: generateLikes(), cover: songImage16 },
    { id: 17, title: "Starboy", album:"Starboy", artist: "Weeknd", likes: generateLikes(), cover: songImage17 },
    { id: 18, title: "Marvins Room", album:"Take Care", artist: "Drake", likes: generateLikes(), cover: songImage18 },
    { id: 19, title: "Kids", album:"The Sailor", artist: "Rich Brian", likes: generateLikes(), cover: songImage19 },
    { id: 20, title: "Antifragile", album:"UNFORGIVEN", artist: "Le Sserafim", likes: generateLikes(), cover: songImage20 },
    { id: 21, title: "Wishing On You", album:"ZONE", artist: "JIHYO", likes: generateLikes(), cover: songImage21 },
];

export const newSongs = [
    savedSongs.find(song => song.id === 1),
    savedSongs.find(song => song.id === 10),
    savedSongs.find(song => song.id === 19),
    savedSongs.find(song => song.id === 16),
    savedSongs.find(song => song.id === 13),
    savedSongs.find(song => song.id === 11),
    savedSongs.find(song => song.id === 21),
    savedSongs.find(song => song.id === 18),
    savedSongs.find(song => song.id === 20),
];

export const allTopSongs = savedSongs.filter(song => song.likes > 50); // Example: Get songs with more than 50 likes
// Get the first 6 top songs
export const topSongs = allTopSongs.slice(0, 9);

// user likes rap and r&b
export const rapSongs = [
    savedSongs.find(song => song.artist === "Drake"),
    savedSongs.find(song => song.artist === "Travis Scott"),
    savedSongs.find(song => song.artist === "Brent Faiyaz"),
    savedSongs.find(song => song.artist === "Don Toliver"),
    savedSongs.find(song => song.artist === "Kanye West"),
    savedSongs.find(song => song.artist === "Rich Brian"),
];
export const rbSongs = [
    savedSongs.find(song => song.artist === "Weeknd"),
    savedSongs.find(song => song.artist === "Tems"),
    savedSongs.find(song => song.artist === "SZA"),
    savedSongs.find(song => song.artist === "Steve Lacey"),
    savedSongs.find(song => song.artist === "4batz"),
    savedSongs.find(song => song.title === "Marvins Room"),
];

export const savedPlaylists = [
    { id: 1, title: "Gym Mix", genre:"Rap/Electronic", cover: playlist1 },
    { id: 2, title: "Chill Vibes", genre:"Alternative/Jazz", cover: playlist2 },
    { id: 3, title: "Anime OSTs",  genre:"Soundtrack/Kpop",cover: playlist3 },
    { id: 4, title: "EDM era", genre:"Electronic", cover: playlist4 },
    { id: 5, title: "Solo Moods", genre:"Rap/R&B", cover: playlist5 },
    { id: 6, title: "Music is Cool", genre:"Pop/R&B",cover: playlist6 },
    { id: 7, title: "Late Night Studying", genre:"Jazz/Soundtrack", cover: playlist7 },
    { id: 8, title: "Long Roads", genre:"Rock/Alternative", cover: playlist8 },
]

export const playlists = [
    savedPlaylists.find(song => song.id === 1),
    savedPlaylists.find(song => song.id === 2),
    savedPlaylists.find(song => song.id === 3),
    savedPlaylists.find(song => song.id === 4),
    savedPlaylists.find(song => song.id === 5),
    savedPlaylists.find(song => song.id === 6),
    savedPlaylists.find(song => song.id === 7),
    savedPlaylists.find(song => song.id === 8),
]


export const yourMusic = [
    savedSongs.find(song => song.artist === "Don Toliver"),
    savedSongs.find(song => song.artist === "Le Sserafim"),
    savedSongs.find(song => song.artist === "nafla"),
    savedSongs.find(song => song.artist === "Weeknd"),
    savedSongs.find(song => song.artist === "Eyedress"),
    savedSongs.find(song => song.artist === "Steve Lacey"),
    savedSongs.find(song => song.artist === "JIHYO"),
]