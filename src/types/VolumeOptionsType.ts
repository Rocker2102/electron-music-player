export interface VolumeOptionsAttr {
    isMute: boolean,
    volume: number
}

interface VolumeOptionsHandlers {
    toggleMute: () => void,
    handleVolumeUpdate: (e: Event, volume: number | number[]) => void
}

export interface VolumeOptionsProps extends VolumeOptionsAttr, VolumeOptionsHandlers {

}

export type VolumeOptionsState = unknown;
