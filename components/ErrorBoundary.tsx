import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Componente que captura errores de JavaScript en sus componentes hijos,
 * muestra una UI de fallback y registra los errores.
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Actualiza el estado para que el siguiente renderizado muestre la UI de fallback.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier UI de fallback personalizada
      return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-2xl font-bold font-['Montserrat'] text-slate-700">Something went wrong.</h1>
          <p className="text-slate-500 mt-2">Please try refreshing the page. If the problem persists, contact support.</p>
        </div>
      );
    }

    // Cast 'this' to 'any' to avoid TypeScript error: Property 'props' does not exist on type 'ErrorBoundary'
    return (this as any).props.children;
  }
}

export default ErrorBoundary;