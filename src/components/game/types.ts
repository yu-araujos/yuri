export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export interface Bullet {
  x: number;
  y: number;
  vy: number;
  isEnemy?: boolean;
}

export interface Alien {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  width: number;
  height: number;
  type: number;
  color: string;
  points: number;
  alive: boolean;
  appearDelay: number;
  hasPopped?: boolean;
  state?: "formation" | "diving" | "returning";
  angle?: number;
  diveSpeed?: number;
  diveSwoopDir?: number;
}

export interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hp: number;
  maxHp: number;
  rotation: number;
  rotSpeed: number;
}

export interface HeartDrop {
  x: number;
  y: number;
  vy: number;
  pulse: number;
}

export interface SpeedDrop {
  x: number;
  y: number;
  vy: number;
  pulse: number;
}

export interface GameState {
  bullets: Bullet[];
  enemyBullets: Bullet[];
  particles: Particle[];
  meteors: Meteor[];
  heartDrops: HeartDrop[];
  speedDrops: SpeedDrop[];
}
