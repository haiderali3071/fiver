import Playlist from './Playlist';
const Random = Playlist
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
var RandomFiltered = Random.filter((item) => item.id !== 1 && item.id !== 22);
RandomFiltered.unshift(Playlist[0])
RandomFiltered.push(Playlist[Playlist.length - 1])

export default RandomFiltered;
