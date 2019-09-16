import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

function LanguagesNav({selected, onUpdateLanguage}){
    const languages = ['All','JavaScript','Ruby','Java','CSS','Python']
    return (
        <ul className='flex-center'>
            {languages.map((lang) => (
                <li key={lang}>
                    <button
                        className='btn-clear nav-link'
                        style={lang === selected ? {color: 'red'} : null}
                        onClick={() => onUpdateLanguage(lang)}>
                        {lang}
                    </button>
                </li>
                )
            )}
        </ul>
    )
}

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

export default class Popular extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            selectedLanguage:'All',
            repos: {},
            error: null
        }
        this.updateLanguage = this.updateLanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }
    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage)
    }
    updateLanguage(selectedLanguage){
        this.setState({
            selectedLanguage,
            error: null,
        })

        if (!this.state.repos[selectedLanguage]) {
            fetchPopularRepos(selectedLanguage)
                .then((data) => {
                    this.setState(({repos})=>({
                        repos:{
                            ...repos,
                            [selectedLanguage]: data
                        }
                    }))
                    console.log(this.state.repos)
                })
                .catch(() => {
                    console.warn('Error fetching repos: ', error)
                    this.setState({
                        error: 'There was an error fetching repos'
                    })
                })
        }
    }

    isLoading(){
        const { selectedLanguage, repos, error } = this.state
        return !repos[selectedLanguage] && error === null
    }

    render() {
        const { selectedLanguage, repos, error } = this.state
        return (
            <React.Fragment>
                <LanguagesNav
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                />

                {this.isLoading() && <p>LOADING</p>}
                {error && <p>{error}</p>}
                {repos[selectedLanguage] && <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>}

            </React.Fragment>
        )
    }
}