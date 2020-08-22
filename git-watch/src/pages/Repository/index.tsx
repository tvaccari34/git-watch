import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { Header, RepositoryInfo, Issues } from './styles';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface RepositoryParams {
    repository: string;
}

const Repository: React.FC = () => {

    const { params } = useRouteMatch<RepositoryParams>();

    return (
        <>
            <Header>
                <img src={logoImg} alt="Github Watch"/>
                <Link to="/">
                <FiChevronLeft size={16} />
                    Back
                </Link>
            </Header>

            <RepositoryInfo>
                <header>
                    <img src="https://avatars0.githubusercontent.com/u/11893246?v=4" alt="tvaccari34"/>
                    <div>
                        <strong>tvaccari34/Ecollect</strong>
                        <p>Descricao do repositorio</p>
                    </div>
                </header>
                <ul>
                    <li>
                        <strong>1808</strong>
                        <span>Stars</span>
                    </li>
                    <li>
                        <strong>48</strong>
                        <span>Forks</span>
                    </li>
                    <li>
                        <strong>67</strong>
                        <span>Issues</span>
                    </li>
                </ul>
            </RepositoryInfo>

            <Issues>
                <Link to={"dfadfadsfds"}>
                    <div>
                        <strong>asdfasdfadf</strong>
                        <p>sdfasdfasdf</p>
                    </div>
                    <FiChevronRight size={20} />
                </Link>
            </Issues>
        </>
    );
}

export default Repository;