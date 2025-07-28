/*import { useState } from 'react';
import Input from '~/components/input'; */
import type { Preset } from '../interfaces';
import Button from '~/components/button';

const PRESETS: Preset[] = [
  {
    id: '16', title: 'Favicon', width: 16, height: 16, pixelSize: 40,
  },
  {
    id: '32', title: '32x32', width: 32, height: 32, pixelSize: 25,
  },
  {
    id: '64', title: '64x64', width: 64, height: 64, pixelSize: 12,
  },
  {
    id: '128', title: '128x128', width: 128, height: 128, pixelSize: 6,
  },
  {
    id: '256', title: '256x256', width: 256, height: 256, pixelSize: 3,
  },
  {
    id: '512 ', title: '512x512', width: 512, height: 512, pixelSize: 1.5,
  },
];

interface Props {
  ref: React.RefObject<HTMLDialogElement | null>;
  closeDialog: () => void;
  onSubmit: (preset: Preset) => void;
}

export default function ResolutionSelectorDialog({
  ref,
  closeDialog,
  onSubmit,
}: Props) {
  /*
  const [formData, setFormData] = useState({
    width: '',
    height: '',
  });
  */

  const handleOnClick = (presetSelected: Preset) => {
    onSubmit(presetSelected);
  };

  return (
    <dialog id="new-proyect" className="modal" ref={ref}>
      <div className="modal-box">
        <section className="flex flex-col justify-center items-center mb-4 gap-6">
          <header className="flex w-full justify-start">
            <button
              type="button"
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={closeDialog}
            >
              ✕
            </button>
            <h1 className="text-2xl">New Draw</h1>
          </header>
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4">
              <h2 className="text-lg">Select Preset</h2>
              <div className="w-full grid grid-cols-3 gap-2">
                {PRESETS.map((item) => (
                  <Button key={item.id} onClick={() => handleOnClick(item)}>
                    {item.title}
                  </Button>
                ))}
              </div>
            </div>

            {/* TODO: Custom Size Section
            <div className="flex flex-col gap-4">
              <h2 className="text-lg">Or Customize Size</h2>
              <form className="flex flex-col gap-4 w-full">
                <div className="flex justify-between items-center gap-4">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">With</legend>
                    <Input
                      type="number"
                      value={formData.width}
                      placeHolder="Width"
                      onChange={(newValue) => setFormData((prev) => ({
                        ...prev,
                        width: newValue,
                      }))}
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Height</legend>
                    <Input
                      type="number"
                      value={formData.height}
                      placeHolder="Height"
                      onChange={(newValue) => setFormData((prev) => ({
                        ...prev,
                        height: newValue,
                      }))}
                    />
                  </fieldset>
                </div>
                <div className="flex justify-end">
                  <Button>Save</Button>
                </div>
              </form>
            </div>
            */}
          </section>
        </section>
      </div>
    </dialog>
  );
}
