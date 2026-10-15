import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../components/DashboardLayout'
import { useApp } from '../../contexts/AppContext'
import { TECHNICIAN_NAV } from '../../configs'
import type { TechnicianStatus } from '../../types'
import { Wrench } from 'lucide-react'

export const TechnicianProfile: React.FC = () => {
    const {
        technician,
        getTechnicianProfile,
        updateTechnicianStatus,
    } = useApp()

    const [loading, setLoading] = useState(true)
    const [savingStatus, setSavingStatus] = useState(false)
    const [error, setError] = useState('')
    const [statusError, setStatusError] = useState('')
    const [statusSuccess, setStatusSuccess] = useState('')

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setError('')
                await getTechnicianProfile()
            } catch (err) {
                console.error('Failed to fetch technician profile:', err)
                setError('Failed to load your profile. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [getTechnicianProfile])

    const handleStatusChange = async (status: TechnicianStatus) => {
        if (!technician || technician.status === status || savingStatus) {
            return
        }

        setSavingStatus(true)
        setStatusError('')
        setStatusSuccess('')

        try {
            await updateTechnicianStatus(status)
            setStatusSuccess('Availability status updated successfully.')
        } catch (err) {
            console.error('Failed to update technician status:', err)
            setStatusError('Failed to update status. Please try again.')
        } finally {
            setSavingStatus(false)
        }
    }

    return (
        <DashboardLayout navItems={TECHNICIAN_NAV}>
            <main className="max-w-2xl w-full mx-auto px-4 py-10">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                    {loading ? (
                        <p className="text-center text-gray-500 py-6">
                            Loading profile...
                        </p>
                    ) : error ? (
                        <div className="text-center py-6">
                            <p className="text-red-600">{error}</p>
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="mt-3 text-purple-600 hover:underline"
                            >
                                Try again
                            </button>
                        </div>
                    ) : !technician ? (
                        <p className="text-center text-gray-500 py-6">
                            Technician profile not found.
                        </p>
                    ) : (
                        <>
                            <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
                                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    <Wrench />
                                </div>

                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        {technician.name}
                                    </h1>
                                    <p className="text-sm text-gray-500">
                                        Service Technician
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-5 text-sm">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">
                                        Current Availability Status
                                    </label>

                                    <div className="flex flex-wrap gap-3">
                                        {(
                                            ['ACTIVE', 'BUSY', 'OFFLINE'] as TechnicianStatus[]
                                        ).map((status) => {
                                            const selected = technician.status === status

                                            const statusStyles = selected
                                                ? status === 'ACTIVE'
                                                    ? 'bg-green-600 text-white border-green-600 shadow-sm'
                                                    : status === 'BUSY'
                                                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                                                      : 'bg-gray-700 text-white border-gray-700 shadow-sm'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'

                                            return (
                                                <button
                                                    key={status}
                                                    type="button"
                                                    disabled={savingStatus || selected}
                                                    onClick={() => handleStatusChange(status)}
                                                    className={`px-4 py-2 rounded-lg font-semibold text-xs border transition disabled:opacity-60 disabled:cursor-not-allowed ${statusStyles}`}
                                                >
                                                    {savingStatus && selected
                                                        ? 'Saving...'
                                                        : status}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <span className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                                        Email Address
                                    </span>
                                    <p className="text-base font-medium text-gray-800">
                                        {technician.email}
                                    </p>
                                </div>

                                <div>
                                    <span className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                                        Phone Number
                                    </span>
                                    <p className="text-base font-medium text-gray-800">
                                        {technician.phone}
                                    </p>
                                </div>

                                <div>
                                    <span className="block text-xs font-semibold text-gray-400 uppercase mb-2">
                                        Registered Skills
                                    </span>

                                    <div className="flex flex-wrap gap-2">
                                        {technician.skills?.length ? (
                                            technician.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-full text-xs font-semibold"
                                                >
                                                    {skill}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">
                                                No registered skills.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </DashboardLayout>
    )
}
