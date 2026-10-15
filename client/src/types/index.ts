export type UserRole = 'USER' | 'TECHNICIAN' | 'ADMIN'

export type RequestStatus =
    | 'CREATED'
    | 'ASSIGNED'
    | 'ACCEPTED'
    | 'ON_THE_WAY'
    | 'ARRIVED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'CANCELLED'

export type TechnicianStatus = 'OFFLINE' | 'ACTIVE' | 'BUSY'

export interface ServiceRequestItem {
    id: string
    userName: string
    technicianName: string
    skillName: string
    description: string
    location: string
    status: RequestStatus
    createdAt: string
}

export interface TechnicianProfile {
    id: string
    name: string
    email: string
    phone: string
    role: UserRole
    status: TechnicianStatus
    skills: string[]
}

export interface RequestCardProps {
    req: MyServiceRequest
    handleCancel: (id: number) => void
}
export interface AdminRequestCardProps {
    req: ServiceRequestItem;
    handleCancel: (requestId: string) => Promise<void>;
    cancellingId: string | null;
}


export interface RegisterPayload {
    name: string
    email: string
    password: string
    phone: string
}

export interface LoginPayload {
    email: string
    password: string
}

export interface LoginResponse {
    token: string
    role: UserRole
    userId: number
}

export interface Skill {
    id: number
    name: string
}

export interface CreateServiceRequestPayload {
    skillId: number
    description: string
    location: string
}

export interface MyServiceRequest {
    id: number
    description: string
    location: string
    status: RequestStatus
    createdAt: string
    user: {
        id: number
        name: string
    }
    skill: {
        id: number
        name: string
    }
    technician?: {
        id: number
        name: string
    } | null
}

export interface AuthResponse {
    userId: number
    role: UserRole
}

export interface TechnicianProfileResponse {
    id: number
    name: string
    email: string
    phone: string
    status: TechnicianStatus
    skills: string[]
}

export interface CreateTechnicianPayload {
    name: string
    email: string
    password: string
    phone: string
    skillIds: number[]
}

export interface AdminTechnicianResponse {
    id: number
    name: string
    email: string
    phone: string
    role: UserRole
    status: TechnicianStatus
    skills: Skill[]
}

export interface AssignTechnicianPayload {
    technicianId: number
}

 interface MenuItem {
    label: string
    onClick: () => void
    danger?: boolean
    disabled?: boolean
}

export interface ActionMenuProps {
    items: MenuItem[]
}

export interface AvailableTechnicianCardProps {
  technician: TechnicianProfile;
  assigning: boolean;
  onAssign: (id: string) => void;
}

export interface TechnicianCardProps {
    tech: TechnicianProfile
}

export interface AssignedTaskCardProps {
  req: {
    id: string;
    skillName: string;
    userName: string;
    location: string;
    description: string;
    status: RequestStatus;
  };
  activePopoverId: string | null;
  togglePopover: (id: string, e: React.MouseEvent) => void;
  setActivePopoverId: React.Dispatch<React.SetStateAction<string | null>>;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
}

interface NavItem {
    label: string
    path: string
}

export interface DashboardLayoutProps {
    children: React.ReactNode
    navItems: NavItem[]
}

export interface RoleGuardProps {
    allowed: UserRole[]
    children: React.ReactNode
}

interface NavItem {
    label: string
    path: string
}

export interface SidebarProps {
    items: NavItem[]
}