
import { useEffect, useState } from 'react'
import './App.css'

interface WeatherForecast {
  date: string
  temperatureC: number
  temperatureF: number
  summary: string
}

const API_URL =
  'https://miprimeraapi-2obx.onrender.com/weatherforecast'

function App() {
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadForecasts() {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status}`)
        }

        const data: WeatherForecast[] = await response.json()
        setForecasts(data)
      } catch {
        setError(
          'No fue posible obtener los datos. Comprueba la conexión con la API.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadForecasts()
  }, [])

  return (
    <main className="container">
      <header className="header">
        <span className="eyebrow">MI PRIMER PROYECTO FULL STACK</span>
        <h1>Pronóstico del tiempo</h1>
        <p>React + TypeScript conectado a una API ASP.NET Core.</p>
      </header>

      {loading && <p className="message">Cargando datos de la API...</p>}

      {error && <p className="message error">{error}</p>}

      {!loading && !error && (
        <>
          <p className="result-count">
            {forecasts.length} registros recibidos desde el backend
          </p>

          <section className="forecast-grid">
            {forecasts.map((forecast) => (
              <article
                className="forecast-card"
                key={`${forecast.date}-${forecast.temperatureC}`}
              >
                <p className="date">
                  {new Date(forecast.date).toLocaleDateString('es-CL', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    timeZone: 'UTC',
                  })}
                </p>

                <div className="temperature">
                  {forecast.temperatureC}°C
                </div>

                <p className="summary">{forecast.summary}</p>

                <p className="secondary-temperature">
                  {forecast.temperatureF}°F
                </p>
              </article>
            ))}
          </section>
        </>
      )}

      <footer>
        Frontend React · API C# · Docker · Render
      </footer>
    </main>
  )
}

export default App
