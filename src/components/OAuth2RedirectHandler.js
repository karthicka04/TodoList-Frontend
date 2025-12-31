import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            localStorage.setItem('token', token);
            navigate('/todo');
        } else {
            navigate('/login');
        }
    }, [searchParams, navigate]);

    return <div>Loading...</div>;
};

export default OAuth2RedirectHandler;
