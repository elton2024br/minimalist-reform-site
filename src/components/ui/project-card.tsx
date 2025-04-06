
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import { Maximize, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  featured?: boolean;
  altText?: string;
  keywords?: string[];
  premiumImage?: string; // Added premiumImage field for Freepik images
  videoUrl?: string; // URL do vídeo
  isVideo?: boolean; // Flag para indicar se é um projeto com vídeo destacado
}

interface ProjectCardProps {
  project: Project;
  className?: string;
  featured?: boolean;
  enableModalView?: boolean;
}

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, className, featured = false, enableModalView = false }, ref) => {
    // Use premium image if available, otherwise fallback to original
    const displayImage = project.premiumImage || project.imageUrl;
    const [videoError, setVideoError] = useState(false);
    
    console.log("Renderizando projeto:", project.title, "isVideo:", project.isVideo, "videoUrl:", project.videoUrl);
    
    return (
      <div 
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg",
          featured ? "aspect-[16/10]" : "aspect-square",
          className
        )}
      >
        {project.isVideo && project.videoUrl && !videoError ? (
          // Renderização de vídeo
          <div className="h-full w-full relative">
            <video
              src={project.videoUrl}
              poster={displayImage || "/placeholder.svg"}
              className="h-full w-full object-cover"
              preload="metadata"
              onError={() => setVideoError(true)}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-primary/80 rounded-full p-4">
                <Play className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        ) : (
          // Renderização de imagem (comportamento original ou fallback)
          <img
            src={displayImage || "/placeholder.svg"}
            alt={project.altText || project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/400x300?text=Imagem+não+encontrada";
            }}
          />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <div className="translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {project.category}
                </span>
                {project.isVideo && (
                  <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800">
                    Vídeo
                  </span>
                )}
              </div>
              <h3 className="text-xl font-medium text-white">{project.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-white/80">{project.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <Link
                  to={`/portfolio/${project.id}`}
                  className="inline-flex items-center text-sm font-medium text-white hover:text-primary"
                >
                  Ver Projeto
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                {enableModalView && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button 
                        className="text-white hover:text-primary rounded-full p-1 bg-black/30 flex items-center justify-center"
                        aria-label={project.isVideo ? "Assistir vídeo" : "Ampliar imagem"}
                      >
                        {project.isVideo && project.videoUrl ? 
                          <Play className="h-4 w-4" /> : 
                          <Maximize className="h-4 w-4" />
                        }
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl p-1 bg-transparent border-none">
                      {project.isVideo && project.videoUrl && !videoError ? (
                        <video 
                          src={project.videoUrl} 
                          controls
                          autoPlay
                          className="w-full h-auto"
                          onError={() => setVideoError(true)}
                        />
                      ) : (
                        <img 
                          src={displayImage || "/placeholder.svg"} 
                          alt={project.altText || project.title} 
                          className="w-full h-auto"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/800x600?text=Imagem+não+encontrada";
                          }}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";
