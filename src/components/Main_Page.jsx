
import { Navigate } from 'react-router-dom'

export const MainPage = ({ authorized }) => {

    if (!authorized) {
        return <Navigate to="/login" />
    }
    return <h1>This is the main page.</h1>
}