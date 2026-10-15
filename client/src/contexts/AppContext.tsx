import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import type {
  UserRole,
  ServiceRequestItem,
  TechnicianProfile,
  RequestStatus,
  RegisterPayload,
  LoginPayload,
  LoginResponse,
  Skill,
  CreateServiceRequestPayload,
  MyServiceRequest,
  AuthResponse,
  TechnicianProfileResponse,
  CreateTechnicianPayload,
  AdminTechnicianResponse,
  TechnicianStatus,
  AssignTechnicianPayload,
} from "../types";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

interface AppContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;

  registerUser: (data: RegisterPayload) => Promise<void>;
  loginUser: (data: LoginPayload) => Promise<LoginResponse>;

  technician: TechnicianProfile | null;
  setTechnician: React.Dispatch<React.SetStateAction<TechnicianProfile | null>>;

  technicians: TechnicianProfile[];
  addTechnician: (tech: TechnicianProfile) => void;
  deleteTechnician: (id: string) => void;
  getAllTechnicians: () => Promise<void>;
  createTechnician: (data: CreateTechnicianPayload) => Promise<void>;

  requests: ServiceRequestItem[];
  updateRequestStatus: (id: string, status: RequestStatus) => Promise<void>;
  getAllServiceRequests: () => Promise<void>;

  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;

  skills: Skill[];
  getSkills: () => Promise<void>;

  createServiceRequest: (data: CreateServiceRequestPayload) => Promise<void>;

  myRequests: MyServiceRequest[];
  getMyRequests: () => Promise<void>;
  cancelServiceRequest: (id: number) => Promise<void>;

  checkAuth: () => Promise<void>;
  authLoading: boolean;
  logoutUser: () => Promise<void>;

  getTechnicianProfile: () => Promise<void>;
  updateTechnicianStatus: (status: TechnicianStatus) => Promise<void>;

  assignTechnician: (
    requestId: string,
    data: AssignTechnicianPayload,
  ) => Promise<void>;

  cancelAdminServiceRequest: (id: string) => Promise<void>;

  assignedRequests: ServiceRequestItem[];
  getTechnicianRequests: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>("USER");

  const [technician, setTechnician] = useState<TechnicianProfile | null>(null);
  const [technicians, setTechnicians] = useState<TechnicianProfile[]>([]);
  const [requests, setRequests] = useState<ServiceRequestItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [myRequests, setMyRequests] = useState<MyServiceRequest[]>([]);
  const [authLoading, setAuthLoading] = useState(true);
  const [assignedRequests, setAssignedRequests] = useState<
    ServiceRequestItem[]
  >([]);

  const registerUser = async (data: RegisterPayload): Promise<void> => {
    try {
      await api.post("/api/auth/user/register", data);
      toast.success("Registered successfully");
    } catch (error: unknown) {
      toast.error("Registration failed");
      throw error;
    }
  };

  const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>("/api/auth/login", data);

      setIsAuthenticated(true);
      setCurrentRole(response.data.role);

      toast.success("Logged in");
      return response.data;
    } catch (error: unknown) {
      toast.error("Login failed");
      throw error;
    }
  };

  const checkAuth = async (): Promise<void> => {
    try {
      const response = await api.get<AuthResponse>("/api/auth/me");

      setIsAuthenticated(true);
      setCurrentRole(response.data.role);
    } catch {
      setIsAuthenticated(false);
      setCurrentRole("USER");
      setTechnician(null);
    } finally {
      setAuthLoading(false);
    }
  };

  const logoutUser = async (): Promise<void> => {
    try {
      await api.post("/api/auth/logout");

      setIsAuthenticated(false);
      setCurrentRole("USER");
      setTechnician(null);
      setMyRequests([]);
      setRequests([]);
      setAssignedRequests([]);

      toast.success("Logged out");
    } catch (error: unknown) {
      toast.error("Logout failed");
      throw error;
    }
  };

  const getSkills = async (): Promise<void> => {
    try {
      const response = await api.get<Skill[]>("/api/skills");
      setSkills(response.data);
    } catch (error: unknown) {
      toast.error("Failed to load skills");
      throw error;
    }
  };

  const createServiceRequest = async (
    data: CreateServiceRequestPayload,
  ): Promise<void> => {
    try {
      await api.post("/api/service-requests", data);
      toast.success("Service request created successfully");
    } catch (error: unknown) {
      toast.error("Failed to create service request");
      throw error;
    }
  };

  const fetchMyRequests = async (): Promise<void> => {
    const response = await api.get<MyServiceRequest[]>(
      "/api/service-requests/my",
    );
    setMyRequests(response.data);
  };

  const getMyRequests = async (): Promise<void> => {
    try {
      await fetchMyRequests();
    } catch (error: unknown) {
      toast.error("Failed to load your service requests");
      throw error;
    }
  };

  const cancelServiceRequest = async (id: number): Promise<void> => {
    try {
      await api.put(`/api/service-requests/${id}/cancel`);
      await fetchMyRequests();
      toast.success("Service request cancelled");
    } catch (error: unknown) {
      toast.error("Failed to cancel service request");
      throw error;
    }
  };

  const getTechnicianProfile = async (): Promise<void> => {
    try {
      const response = await api.get<TechnicianProfileResponse>(
        "/api/technicians/me",
      );
      const data = response.data;

      setTechnician({
        id: String(data.id),
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: "TECHNICIAN",
        status: data.status,
        skills: data.skills ?? [],
      });
    } catch (error: unknown) {
      toast.error("Failed to load technician profile");
      throw error;
    }
  };

  const sendTechnicianStatus = async (
    status: TechnicianStatus,
  ): Promise<void> => {
    await api.put("/api/technicians/status", { status });

    setTechnician((previous) =>
      previous ? { ...previous, status } : previous,
    );
  };

  const updateTechnicianStatus = async (
    status: TechnicianStatus,
  ): Promise<void> => {
    try {
      await sendTechnicianStatus(status);
      toast.success("Technician status updated");
    } catch (error: unknown) {
      toast.error("Failed to update technician status");
      throw error;
    }
  };

  const fetchAllTechnicians = async (): Promise<void> => {
    const response = await api.get<AdminTechnicianResponse[]>(
      "/api/admin/technicians",
    );

    setTechnicians(
      response.data.map((tech) => ({
        id: String(tech.id),
        name: tech.name,
        email: tech.email,
        phone: tech.phone,
        role: tech.role,
        status: tech.status,
        skills: (tech.skills ?? []).map((skill) => skill.name),
      })),
    );
  };

  const getAllTechnicians = async (): Promise<void> => {
    try {
      await fetchAllTechnicians();
    } catch (error: unknown) {
      toast.error("Failed to load technicians");
      throw error;
    }
  };

  const createTechnician = async (
    data: CreateTechnicianPayload,
  ): Promise<void> => {
    try {
      await api.post("/api/admin/technicians", data);
      await fetchAllTechnicians();
      toast.success("Technician created successfully");
    } catch (error: unknown) {
      toast.error("Failed to create technician");
      throw error;
    }
  };

  const addTechnician = (tech: TechnicianProfile): void => {
    setTechnicians((previous) => [...previous, tech]);
  };

  const deleteTechnician = (id: string): void => {
    setTechnicians((previous) => previous.filter((tech) => tech.id !== id));
  };

  const fetchAllServiceRequests = async (): Promise<void> => {
    const response = await api.get("/api/admin/service-requests");

    const formattedRequests: ServiceRequestItem[] = response.data.map(
      (req: any) => ({
        id: String(req.id),
        skillName: req.skill?.name ?? "Unknown service",
        userName: req.user?.name ?? "Unknown customer",
        technicianName: req.technician?.name ?? "Unassigned",
        description: req.description ?? "",
        location: req.location ?? "",
        status: req.status as RequestStatus,
        createdAt: req.createdAt
          ? new Date(req.createdAt).toLocaleDateString()
          : "",
      }),
    );

    setRequests(formattedRequests);
  };

  const getAllServiceRequests = async (): Promise<void> => {
    try {
      await fetchAllServiceRequests();
    } catch (error: unknown) {
      toast.error("Failed to load service requests");
      throw error;
    }
  };

  const fetchTechnicianRequests = async (): Promise<void> => {
    const response = await api.get("/api/technicians/requests");

    const formattedRequests: ServiceRequestItem[] = response.data.map(
      (req: any) => ({
        id: String(req.id),
        skillName: req.skill?.name ?? "Unknown service",
        userName: req.user?.name ?? "Unknown customer",
        technicianName: req.technician?.name ?? "Unassigned",
        description: req.description ?? "",
        location: req.location ?? "",
        status: req.status as RequestStatus,
        createdAt: req.createdAt
          ? new Date(req.createdAt).toLocaleDateString()
          : "",
      }),
    );

    setAssignedRequests(formattedRequests);
  };

  const getTechnicianRequests = async (): Promise<void> => {
    try {
      await fetchTechnicianRequests();
    } catch (error: unknown) {
      toast.error("Failed to load assigned tasks");
      throw error;
    }
  };

  const updateRequestStatus = async (
    id: string,
    status: RequestStatus,
  ): Promise<void> => {
    try {
      await api.put(`/api/service-requests/${id}/status`, { status });

      if (status === "COMPLETED") {
        await sendTechnicianStatus("ACTIVE");
      }

      await fetchTechnicianRequests();
      toast.success("Request status updated");
    } catch (error: unknown) {
      toast.error("Failed to update request status");
      throw error;
    }
  };

  const assignTechnician = async (
    requestId: string,
    data: AssignTechnicianPayload,
  ): Promise<void> => {
    try {
      await api.put(`/api/admin/service-requests/${requestId}/assign`, data);

      await Promise.all([fetchAllServiceRequests(), fetchAllTechnicians()]);

      toast.success("Technician assigned successfully");
    } catch (error: unknown) {
      toast.error("Failed to assign technician");
      throw error;
    }
  };

  const cancelAdminServiceRequest = async (id: string): Promise<void> => {
    try {
      await api.put(`/api/admin/service-requests/${id}/cancel`);
      await fetchAllServiceRequests();
      toast.success("Service request cancelled");
    } catch (error: unknown) {
      toast.error("Failed to cancel service request");
      throw error;
    }
  };

  useEffect(() => {
    void checkAuth();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        currentRole,
        setCurrentRole,
        registerUser,
        loginUser,
        technician,
        setTechnician,
        technicians,
        addTechnician,
        deleteTechnician,
        getAllTechnicians,
        createTechnician,
        requests,
        updateRequestStatus,
        getAllServiceRequests,
        isSidebarOpen,
        setIsSidebarOpen,
        skills,
        getSkills,
        createServiceRequest,
        myRequests,
        getMyRequests,
        cancelServiceRequest,
        checkAuth,
        authLoading,
        logoutUser,
        getTechnicianProfile,
        updateTechnicianStatus,
        assignTechnician,
        cancelAdminServiceRequest,
        assignedRequests,
        getTechnicianRequests,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }

  return context;
};
