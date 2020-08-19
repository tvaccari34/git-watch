import React, { useState, FormEvent } from 'react';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories } from './styles';

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
    const [repositories, setRepositories] = useState<Repository[]>([]);

    //function to add a new repository
    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault(); //Prevent the form default behavior

        const response = await api.get<Repository>(`repos/${newRepository}`);

        const repository = response.data;

        setRepositories([...repositories, repository]);

        //To clear the input
        setNewRepository('');
    }

    return(
        <>
            <img src={logoImg} alt="GitWatch"/>
            <Title>Explore repositories on Github</Title>

            <Form onSubmit={handleAddRepository}>
                <input
                    value={newRepository}
                    onChange={(e) => setNewRepository(e.target.value)} placeholder="type repository's name"/>
                <button>Search</button>
            </Form>

            <Repositories>

                {repositories.map(repository => (
                    <a key={repository.full_name} href="test">
                        <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Repositories>
        </>
    )
}

export default Dashboard;