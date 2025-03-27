import { Project } from "../entities/Project";

export const fetchProjects = async (activeFilter = "all", areaFilter = ""): Promise<Project[]> => {
  let url = `/api/projects`;
  const params = new URLSearchParams();

  if (activeFilter !== "all") params.append("active", activeFilter);
  if (areaFilter) params.append("area_id", areaFilter);
  if (params.toString()) url += `?${params.toString()}`;

  const response = await fetch(url, {
    credentials: 'include',
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to fetch projects.');

  const data = await response.json();
  return data.projects || data;
};

export const fetchProjectById = async (projectId: string): Promise<Project> => {
  const response = await fetch(`/api/project/${projectId}`, {
    credentials: 'include',
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to fetch project details.');

  return await response.json();
};

export const createProject = async (projectData: Partial<Project>): Promise<Project> => {
  const response = await fetch('/api/project', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) throw new Error('Failed to create project.');

  return await response.json();
};

export const updateProject = async (projectId: number, projectData: Partial<Project>): Promise<Project> => {
  const response = await fetch(`/api/project/${projectId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) throw new Error('Failed to update project.');

  return await response.json();
};

export const deleteProject = async (projectId: number): Promise<void> => {
  const response = await fetch(`/api/project/${projectId}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Failed to delete project.');
};
