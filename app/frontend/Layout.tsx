import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./styles/tailwind.css";
import ProjectModal from "./components/Project/ProjectModal";
import NoteModal from "./components/Note/NoteModal";
import AreaModal from "./components/Area/AreaModal";
import TagModal from "./components/Tag/TagModal";
import TaskModal from "./components/Task/TaskModal";

import { Note } from "./entities/Note";
import { Area } from "./entities/Area";
import { Tag } from "./entities/Tag";
import { Project } from "./entities/Project";
import { Task } from "./entities/Task";
import { useDataContext } from "./contexts/DataContext";
import { User } from "./entities/User";

interface LayoutProps {
  currentUser: User;
  isDarkMode: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  toggleDarkMode: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  currentUser,
  setCurrentUser,
  isDarkMode,
  toggleDarkMode,
  children,
}) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [newTask, setNewTask] = useState<Task | null>(null);

  const {
    tags,
    areas,
    notes,
    isLoading,
    isError,
    createNote,
    updateNote,
    deleteNote,
    createArea,
    updateArea,
    deleteArea,
    createTag,
    updateTag,
    deleteTag,
    createProject,
    updateProject,
    deleteProject,
    createTask,
    updateTask,
  } = useDataContext();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(
    window.innerWidth >= 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openNoteModal = (note: Note | null = null) => {
    setSelectedNote(note);
    setIsNoteModalOpen(true);
  };

  const closeNoteModal = () => {
    setIsNoteModalOpen(false);
    setSelectedNote(null);
  };

  const openTaskModal = () => {
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setNewTask(null);
  };

  const openProjectModal = () => {
    setIsProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
  };

  const openAreaModal = (area: Area | null = null) => {
    setSelectedArea(area);
    setIsAreaModalOpen(true);
  };

  const closeAreaModal = () => {
    setIsAreaModalOpen(false);
    setSelectedArea(null);
  };

  const openTagModal = (tag: Tag | null = null) => {
    setSelectedTag(tag);
    setIsTagModalOpen(true);
  };

  const closeTagModal = () => {
    setIsTagModalOpen(false);
    setSelectedTag(null);
  };

  const handleSaveNote = async (noteData: Note) => {
    try {
      if (noteData.id) {
        await updateNote(noteData.id, {
          title: noteData.title,
          content: noteData.content,
          tags: noteData.tags?.map((tag) => tag.name),
          project_id: noteData.project?.id,
        });
      } else {
        await createNote({
          title: noteData.title,
          content: noteData.content,
          tags: noteData.tags?.map((tag) => tag.name),
          project_id: noteData.project?.id,
        });
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
    closeNoteModal();
  };

  const handleSaveTask = async (taskData: Task) => {
    try {
      if (taskData.id) {
        await updateTask(taskData.id, taskData);
      } else {
        await createTask(taskData);
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
    closeTaskModal();
  };

  const handleSaveProject = async (projectData: Project) => {
    try {
      if (projectData.id) {
        await updateProject(projectData.id, projectData);
      } else {
        await createProject(projectData);
      }
    } catch (error) {
      console.error("Error saving project:", error);
    }
    closeProjectModal();
  };

  const handleSaveArea = async (areaData: Area) => {
    try {
      if (areaData.id) {
        await updateArea(areaData.id, areaData);
      } else {
        await createArea(areaData);
      }
    } catch (error) {
      console.error("Error saving area:", error);
    }
    closeAreaModal();
  };

  const handleSaveTag = async (tagData: Tag) => {
    try {
      if (tagData.id) {
        await updateTag(tagData.id, tagData);
      } else {
        await createTag(tagData);
      }
    } catch (error) {
      console.error("Error saving tag:", error);
    }
    closeTagModal();
  };

  const mainContentMarginLeft = isSidebarOpen ? "ml-72" : "ml-0";

  if (isLoading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
        <Navbar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          currentUser={currentUser}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          openTaskModal={openTaskModal}
          openProjectModal={openProjectModal}
          openNoteModal={openNoteModal}
          openAreaModal={openAreaModal}
          openTagModal={openTagModal}
          notes={notes}
          areas={areas}
          tags={tags}
        />
        <div
          className={`flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-800 transition-all duration-300 ease-in-out ${mainContentMarginLeft}`}
        >
          <div className="text-xl text-gray-700 dark:text-gray-200">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
        <Navbar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          currentUser={currentUser}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          openTaskModal={openTaskModal}
          openProjectModal={openProjectModal}
          openNoteModal={openNoteModal}
          openAreaModal={openAreaModal}
          openTagModal={openTagModal}
          notes={notes}
          areas={areas}
          tags={tags}
        />
        <div
          className={`flex-1 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 transition-all duration-300 ease-in-out ${mainContentMarginLeft}`}
        >
          <div className="text-xl text-red-500">Error fetching data.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        currentUser={currentUser}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        openTaskModal={openTaskModal}
        openProjectModal={openProjectModal}
        openNoteModal={openNoteModal}
        openAreaModal={openAreaModal}
        openTagModal={openTagModal}
        notes={notes}
        areas={areas}
        tags={tags}
      />

      <div
        className={`transition-all duration-300 ease-in-out ${mainContentMarginLeft}`}
      >
        <div className="flex flex-col bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen overflow-y-auto">
          <div className="flex-grow py-6 px-2 md:px-6 pt-24">
            <div className="w-full max-w-5xl mx-auto">{children}</div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={openTaskModal}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg focus:outline-none transform transition-transform duration-200 hover:scale-110"
        aria-label="Open Task Modal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      {/* Modals */}
      {isTaskModalOpen && (
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={closeTaskModal}
          task={
            newTask || {
              id: undefined,
              name: '',
              status: 'not_started',
              project_id: undefined,
              tags: [],
            }
          }
          onSave={handleSaveTask}
          onDelete={() => {}}
          projects={[]} // Provide project list as necessary
          onCreateProject={async (name: string) => {
            return {
              id: Math.random(),
              name,
              active: true,
              pin_to_sidebar: false,
            }; // Ensure all required fields are covered
          }}
        />
      )}

      {isProjectModalOpen && (
        <ProjectModal
          isOpen={isProjectModalOpen}
          onClose={closeProjectModal}
          onSave={handleSaveProject}
          areas={areas}
        />
      )}

      {isNoteModalOpen && (
        <NoteModal
          isOpen={isNoteModalOpen}
          onClose={closeNoteModal}
          onSave={handleSaveNote}
          note={selectedNote}
        />
      )}

      {isAreaModalOpen && (
        <AreaModal
          isOpen={isAreaModalOpen}
          onClose={closeAreaModal}
          onSave={handleSaveArea}
          area={selectedArea}
        />
      )}

      {isTagModalOpen && (
        <TagModal
          isOpen={isTagModalOpen}
          onClose={closeTagModal}
          onSave={handleSaveTag}
          tag={selectedTag}
        />
      )}
    </div>
  );
};

export default Layout;

