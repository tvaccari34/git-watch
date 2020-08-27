import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { Header, RepositoryInfo, Issues } from './styles';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import api from '../../services/api';

interface RepositoryParams {
    repository: string;
}

interface Repository {
    full_name: string;
    owner: {
        login: string;
        avatar_url: string;
    };
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
}

interface Issue {
    id: string;
    title: string;
    user: {
        login: string;
    }
}


const Repository: React.FC = () => {

    const [ repository, setRepository ] = useState<Repository | null>(null);
    const [ issues, setIssues ] = useState<Issue[]>([]);

    const { params } = useRouteMatch<RepositoryParams>();

    useEffect(() => {

        api.get(`repos/${params.repository}`).then(response => {
            setRepository(response.data);
        });

        api.get(`repos/${params.repository}/issues`).then(response => {
            setIssues(response.data);
        });

        // async function loadData(): Promise<Repository> {
        //     const [ repository, issues ] = await Promise.all([
        //         api.get(),
        //         api.get(`repos/${params.repository}/issues`)
        //     ]);


        //     return repository;
        // }

        //loadData();
    }, [params.repository]);

    return (
        <>
            <Header>
                <img src={logoImg} alt="Github Watch"/>
                <Link to="/">
                <FiChevronLeft size={16} />
                    Back
                </Link>
            </Header>

            {repository && (
                <RepositoryInfo>
                    <header>
                        <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repository.stargazers_count}</strong>
                            <span>Stars</span>
                        </li>
                        <li>
                            <strong>{repository.forks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repository.open_issues_count}</strong>
                            <span>Issues</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}

            <Issues>
                <Link to={"dfadfadsfds"}>
                    <div>
                        <strong></strong>
                        <p>sdfasdfasdf</p>
                    </div>
                    <FiChevronRight size={20} />
                </Link>
            </Issues>
        </>
    );
}

export default Repository;