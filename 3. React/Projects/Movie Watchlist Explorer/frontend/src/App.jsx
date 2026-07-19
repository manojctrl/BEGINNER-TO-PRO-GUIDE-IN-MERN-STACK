import React, { useEffect, useMemo, useState } from 'react'
import './App.css'
import Search from './components/Search'
import MovieList from './components/MovieList'
import Watchlist from './components/Watchlist'
import MovieModal from './components/MovieModal'

const SAMPLE_MOVIES = [
  {
    id: 'm1',
    title: 'The Shawshank Redemption',
    year: '1994',
    poster: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlZTI4ZjYxXkEyXkFqcGdeQXVyNDY2MTk1Njg@._V1_SX300.jpg',
    plot: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
  },
  {
    id: 'm2',
    title: 'Inception',
    year: '2010',
    poster: 'https://m.media-amazon.com/images/I/51s+Z+9j2PL._AC_.jpg',
    plot: 'A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.'
  },
  {
    id: 'm3',
    title: 'Interstellar',
    year: '2014',
    poster: 'https://m.media-amazon.com/images/I/71n58m6tVQL._AC_SY679_.jpg',
    plot: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
  },
  {
    id: 'm4',
    title: 'The Dark Knight',
    year: '2008',
    poster: 'https://m.media-amazon.com/images/I/51EbJjlx2FL._AC_.jpg',
    plot: 'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and DA Harvey Dent, Batman sets out to dismantle the remaining criminal organizations.'
  },
  {
    id: 'm5',
    title: 'Parasite',
    year: '2019',
    poster: 'https://m.media-amazon.com/images/I/91i0a8kFZ0L._SL1500_.jpg',
    plot: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.'
  }
]

function App() {
  const [query, setQuery] = useState('')
  const [watchlist, setWatchlist] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem('watchlist:movies')
    if (raw) {
      try {
        setWatchlist(JSON.parse(raw))
      } catch (e) {
        setWatchlist([])
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('watchlist:movies', JSON.stringify(watchlist))
  }, [watchlist])

  const watchlistIds = useMemo(() => new Set(watchlist.map((m) => m.id)), [watchlist])

  function handleAdd(movie) {
    if (watchlistIds.has(movie.id)) return
    setWatchlist((s) => [movie, ...s])
  }

  function handleRemove(id) {
    setWatchlist((s) => s.filter((m) => m.id !== id))
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return SAMPLE_MOVIES
    return SAMPLE_MOVIES.filter((m) => m.title.toLowerCase().includes(q))
  }, [query])

  return (
    <div className="app">
      <header>
        <h1>Movie Watchlist Explorer</h1>
      </header>

      <main>
        <section className="left">
          <Search query={query} onChange={setQuery} />
          <MovieList
            movies={filtered}
            onAdd={handleAdd}
            onRemove={handleRemove}
            watchlistIds={watchlistIds}
            onSelect={setSelected}
          />
        </section>

        <aside className="right">
          <Watchlist items={watchlist} onRemove={handleRemove} onSelect={setSelected} />
        </aside>
      </main>

      <MovieModal movie={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

export default App
