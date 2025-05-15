import { pool } from '../db.js'

export const searchMovies = async (req, res) => {
    const { query } = req.query
    
    try {
        // Buscar películas
        const [movies] = await pool.query(`
            SELECT DISTINCT m.*, 'movie' as type
            FROM movies m
            LEFT JOIN movie_genres mg ON m.id = mg.movie_id
            LEFT JOIN genres g ON mg.genre_id = g.id
            WHERE m.title LIKE ? 
            OR m.description LIKE ?
            OR g.name LIKE ?
        `, [`%${query}%`, `%${query}%`, `%${query}%`]);

        // Buscar series
        const [tvShows] = await pool.query(`
            SELECT DISTINCT t.*, 'tv-show' as type
            FROM tv_shows t
            LEFT JOIN tv_show_genres tg ON t.id = tg.tv_show_id
            LEFT JOIN genres g ON tg.genre_id = g.id
            WHERE t.title LIKE ? 
            OR t.description LIKE ?
            OR g.name LIKE ?
        `, [`%${query}%`, `%${query}%`, `%${query}%`]);

        // Combinar y ordenar resultados
        const results = [...movies, ...tvShows].sort((a, b) => {
            // Priorizar coincidencias exactas en el título
            const aTitleMatch = a.title.toLowerCase() === query.toLowerCase();
            const bTitleMatch = b.title.toLowerCase() === query.toLowerCase();
            if (aTitleMatch && !bTitleMatch) return -1;
            if (!aTitleMatch && bTitleMatch) return 1;
            return 0;
        });
        
        res.json(results);
    } catch (error) {
        console.error('Error searching content:', error);
        res.status(500).json({ message: 'Error searching content' });
    }
}
