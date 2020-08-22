import React, { useState, useEffect, FormEvent } from 'react';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
    full_name: string;
    owner: {
        login: string;
        avatar_url: string;
    };
    description: string;
}

const Dashboard: React.FC = () => {

    //To deal with the state of the data
    //useState: Create a state with the first value
    //repositories: The State value
    //setRepositories: Function to change the state

    const [newRepository, setNewRepository] = useState('');
    const [inputError, setInputError] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storageRepositories = localStorage.getItem('@GibhubWatch:repositories');

        if (storageRepositories) {
            return JSON.parse(storageRepositories);
        }
        else return [];
    });

    //call a function when parameter has been changed
    useEffect(() => {
        localStorage.setItem('@GibhubWatch:repositories', JSON.stringify(repositories));
    }, [repositories]);

    //function to add a new repository
    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault(); //Prevent the form default behavior

        if (!newRepository) {
            setInputError('Author/Repository is missing.');
            return;
        }

        try {
            const response = await api.get<Repository>(`repos/${newRepository}`);

            const repository = response.data;

            setRepositories([...repositories, repository]);

            //To clear the input
            setNewRepository('');
            setInputError('');

        } catch (error) {
            setInputError('Error when trying to find that repository. Please use "Author/Repository" format.');
        }
    }

    return(
        <>
            <img src={logoImg} alt="GitWatch"/>
            <Title>Explore repositories on Github</Title>

            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                    value={newRepository}
                    onChange={(e) => setNewRepository(e.target.value)} placeholder="type repository's name"/>
                <button>Search</button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            <Repositories>

                {repositories.map(repository => (
                    <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
                        <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </Link>
                ))}
            </Repositories>
        </>
    )
}

export default Dashboard;