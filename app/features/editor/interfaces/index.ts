interface CanvasSize {
  width: number;
  height: number;
}

interface Preset {
  id: string;
  title: string;
  width: number;
  height: number;
  pixelSize: number;
}

export type { CanvasSize, Preset };
