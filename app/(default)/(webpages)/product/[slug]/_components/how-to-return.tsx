import Image from 'next/image';

const steps = [
  {
    step: 'STEP 1',
    img: 'https://cdn.media.amplience.net/i/noblepanacea/Step 1?qlt=default&fmt=auto',
    description: 'A complimentary envelope is provided in each order',
  },
  {
    step: 'STEP 2',
    img: 'https://cdn.media.amplience.net/i/noblepanacea/step 2_2?qlt=default&fmt=auto',
    description: 'Collect your empty Active Daily Doses inside the complimentary envelope',
  },
  {
    step: 'STEP 3',
    img: 'https://cdn.media.amplience.net/i/noblepanacea/step 3_2?qlt=default&fmt=auto',
    description: 'Once full, contact the Noble Panacea Skincare Concierge for a shipping label',
  },
  {
    step: 'STEP 4',
    img: 'https://cdn.media.amplience.net/i/noblepanacea/step 4_2?qlt=default&fmt=auto',
    description: 'Affix the printed shipping label to the envelope and drop it in your mailbox',
  },
];

function HowToReturn() {
  return (
    <div className="font-extralight">
      <div className="space-y-8 p-8 text-center">
        <h1 className="text-3xl uppercase">How to Recycle Our Active Daily Doses</h1>
        <p>THINK BEAUTIFULLY, ACT BEAUTIFULLY</p>
        <p>
          Please dispose of our Active Daily Doses with TerraCycle for a responsible beauty ritual.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8 p-8 lg:grid-cols-4">
        {steps.map(({ step, img, description }) => (
          <div key={step} className="space-y-4">
            <Image src={img} alt={step} height={800} width={600} />
            <div className="space-y-2">
              <h2 className="text-xl font-light">{step}</h2>
              <p className="text-sm">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowToReturn;
