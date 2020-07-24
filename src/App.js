import React, { useState, useEffect } from 'react'
import CharacterTable from './components/character-table'

function App() {
    const [people, setPeople] = useState([])
    const [nextUrl, setNextUrl] = useState('')
    const [loading, setLoading] = useState(true)

    const URL = 'https://swapi.dev/api/people/'

    useEffect(() => {
        fetchResults(URL)
    }, [])

    function fetchResults(url) {
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                setNextUrl(responseJson.next)
                return responseJson.results
            })
            .then(people => {
                setPeople([...people])
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    else {
        return (
            <CharacterTable
                people={people}
                nextUrl={nextUrl}
                fetchResults={fetchResults} />
        )
    }
}

export default App 
