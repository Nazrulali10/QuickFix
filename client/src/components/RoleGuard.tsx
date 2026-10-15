import React from 'react'
import { Navigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import type { RoleGuardProps, UserRole } from '../types'

const ROLE_HOME: Record<UserRole, string> = {
    USER: '/',
    TECHNICIAN: '/technician/dashboard',
    ADMIN: '/admin/technicians',
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowed, children }) => {
    const { isAuthenticated, currentRole } = useApp()

    if (isAuthenticated && !allowed.includes(currentRole)) {
        return <Navigate to={ROLE_HOME[currentRole]} replace />
    }

    return <>{children}</>
}

