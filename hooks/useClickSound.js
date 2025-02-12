import useSound from "use-sound";

export default function useClickSound() {
  const [clickSound] = useSound("/assets/sounds/ui/buttonSfx.mp3");

  return () => {
    clickSound();
  };
}
