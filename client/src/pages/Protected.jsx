import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Protected({ user, redirect = "/login", children }) {
    if (!user) return <Navigate to={redirect} replace />
    return children
}
