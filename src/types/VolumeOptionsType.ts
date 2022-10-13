export interface VolumeOptionsAttr {
    isMute: boolean;
    volume: number;
}

interface VolumeOptionsHandlers {
    toggleMute: () => void;
    handleVolumeUpdate: (volume: number) => void;
}

export interface VolumeOptionsProps extends VolumeOptionsAttr, VolumeOptionsHandlers {}

export interface VolumeOptionsState {
    volume: number;
}
