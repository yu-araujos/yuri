export const SHIP_WIDTH = 40;
export const SHIP_BASE_SPEED = 8;
export const SHIP_BOOST_SPEED = 12;

export const INVINCIBILITY_FRAMES = 130;
export const HIT_FLASH_DURATION_MS = 200;

export const FIRE_COOLDOWN_NORMAL_MS = 550;
export const FIRE_COOLDOWN_BOOST_MS = 150;
export const BULLET_SPEED = -14;

export const SPEED_BOOST_DURATION_FRAMES = 480;
export const MAX_LIVES = 3;

export const ALIEN_COLORS = {
  cyan: "#32C7C7",
  amber: "#F59E0B",
  pink: "#EC4899",
} as const;

export const SHIP_COLOR = "#32C7C7";
export const SHIP_CANNON_COLOR = "#A4FFBE";

export const BULLET_COLOR = "#32C7C7";
export const ENEMY_BULLET_COLOR = "#E087FF";

export const PARTICLE_COLORS = {
  fire: ["#F97316", "#FACC15"] as string[],
  rock: "#78716C",
  heart: "#EF4444",
  speed: "#FACC15",
  hit: "#EF4444",
};

// Wave/alien movement
export const ALIEN_BASE_SPEED = 1.5;
export const EDGE_HIT_COOLDOWN = 25;

// Meteors start at wave 5
export const METEOR_START_WAVE = 5;
// Heart drops start at wave 3
export const HEART_DROP_START_WAVE = 3;
export const HEART_DROP_CHANCE = 0.1;
export const SPEED_DROP_CHANCE = 0.12;
export const METEOR_HEART_DROP_CHANCE = 0.25;
export const METEOR_SPEED_DROP_CHANCE = 0.25;
