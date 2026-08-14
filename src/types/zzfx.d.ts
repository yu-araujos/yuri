declare module "zzfx" {
  export function zzfx(...parameters: (number | undefined)[]): AudioBufferSourceNode;
  export const ZZFX: {
    volume: number;
    sampleRate: number;
    audioContext: AudioContext;
    play(...parameters: (number | undefined)[]): AudioBufferSourceNode;
    playSamples(
      sampleChannels: Float32Array[],
      volumeScale?: number,
      rate?: number,
      pan?: number,
      loop?: boolean
    ): AudioBufferSourceNode;
    buildSamples(
      volume?: number,
      randomness?: number,
      frequency?: number,
      attack?: number,
      sustain?: number,
      release?: number,
      shape?: number,
      shapeCurve?: number,
      slide?: number,
      deltaSlide?: number,
      pitchJump?: number,
      pitchJumpTime?: number,
      repeatTime?: number,
      noise?: number,
      modulation?: number,
      bitCrush?: number,
      delay?: number,
      sustainVolume?: number,
      decay?: number,
      tremolo?: number,
      filter?: number
    ): Float32Array;
    getNote(rootNoteFrequency: number, semitoneOffset: number): number;
  };
}
