"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getEntityById, type Entity3D, type Project } from "@/data";
import { EntitySidebar } from "@/components/EntitySidebar";
import { EntityViewer } from "@/components/EntityViewer";
import { EntityInfoPanel } from "@/components/EntityInfoPanel";
import { Header, Footer } from "@/components/Layout";
import { initializePreload } from "@/lib/modelLoader";
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  MobileViewerControls,
  useMobileViewerControls,
} from "@/components/MobileViewerControls";

interface ProjectClientProps {
  project: Project;
}

export function ProjectClient({ project }: ProjectClientProps) {
  const router = useRouter();
  const [activeEntity, setActiveEntity] = useState<Entity3D | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [infoPanelOpen, setInfoPanelOpen] = useState(false);

  // Mobile viewer controls
  const {
    controlsRef,
    containerRef,
    autoRotate,
    isFullscreen,
    handleReset,
    handleToggleRotate,
    handleToggleFullscreen,
  } = useMobileViewerControls();

  useEffect(() => {
    // Get first entity as default selection
    const firstEntity = project.models[0];
    if (firstEntity) {
      setActiveEntity(firstEntity);
      // Initialize model preloading - only for current project
      initializePreload(firstEntity.id, project.slug);
    }
    setLoading(false);
  }, [project]);

  const handleSelectEntity = (id: string) => {
    const entity = getEntityById(id);
    if (entity) {
      setActiveEntity(entity);
      // Close sidebar after selection (mobile)
      setSidebarOpen(false);
    }
  };

  return (
    <div className="h-dvh grid grid-rows-[auto_1fr_auto] px-1 pb-3 gap-3 container w-full mx-auto overflow-hidden sm:px-3  sm:gap-2">
      <Header project={project} />
      {loading || !activeEntity ? (
        <main className="min-h-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-(--ink-primary)">
              Loading...
            </div>
          </div>
        </main>
      ) : (
        <main className="min-h-0 overflow-hidden">
          {/* Mobile control buttons */}
          <div className="sm:hidden">
            <MobileViewerControls
              autoRotate={autoRotate}
              onToggleRotate={handleToggleRotate}
              onReset={handleReset}
              isFullscreen={isFullscreen}
              onToggleFullscreen={handleToggleFullscreen}
              onOpenSidebar={() => setSidebarOpen(true)}
              onOpenInfoPanel={() => setInfoPanelOpen(true)}
            />
          </div>

          {/* Mobile: 3D Viewer full-width display */}
          <section
            className="sm:hidden relative h-full overflow-hidden sm:rounded-xl sm:border border-(--border-primary) bg-linear-to-br from-(--bg-secondary) to-(--bg-primary)"
            style={{ "--accent": activeEntity.accent } as React.CSSProperties}
          >
            <EntityViewer
              key={activeEntity.id}
              entity={activeEntity}
              controlsRef={controlsRef}
              containerRef={containerRef}
              autoRotate={autoRotate}
              isFullscreen={isFullscreen}
              onReset={handleReset}
              onToggleRotate={handleToggleRotate}
              onToggleFullscreen={handleToggleFullscreen}
            />
          </section>

          {/* Desktop: Three-column resizable layout */}
          <ResizablePanelGroup
            orientation="horizontal"
            className="hidden sm:flex h-full rounded-xl border border-(--border-primary)"
          >
            {/* Left Panel - Sidebar */}
            <ResizablePanel defaultSize="20%" minSize="15%" maxSize="30%">
              <ScrollArea className="h-full bg-(--bg-card)  rounded-l-xl shadow-sm ">
                <EntitySidebar
                  project={project}
                  activeId={activeEntity.id}
                  onSelect={handleSelectEntity}
                />
              </ScrollArea>
            </ResizablePanel>

            {/* Center Panel - 3D Viewer */}
            <ResizablePanel>
              <section
                className="relative h-full overflow-hidden bg-linear-to-br from-(--bg-secondary) to-(--bg-primary)"
                style={
                  { "--accent": activeEntity.accent } as React.CSSProperties
                }
              >
                <EntityViewer key={activeEntity.id} entity={activeEntity} />
              </section>
            </ResizablePanel>

            {/* Right Panel - Info */}
            <ResizablePanel defaultSize="25%" minSize="0%" maxSize="40%">
              <ScrollArea className="h-full bg-(--bg-card)  rounded-r-xl shadow-sm ">
                <EntityInfoPanel entity={activeEntity} />
              </ScrollArea>
            </ResizablePanel>
          </ResizablePanelGroup>

          {/* Mobile drawer */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent side="left" className="p-0 space-y-0 gap-0">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  {project.tabName}
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-full">
                <EntitySidebar
                  project={project}
                  activeId={activeEntity.id}
                  onSelect={handleSelectEntity}
                />
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <Sheet open={infoPanelOpen} onOpenChange={setInfoPanelOpen}>
            <SheetContent side="right" className="p-0 space-y-0 gap-0">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2"></SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-full">
                <EntityInfoPanel entity={activeEntity} />
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </main>
      )}
      <Footer />
    </div>
  );
}
