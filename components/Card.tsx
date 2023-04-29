import { PropsWithChildren } from 'react'

const Card = ({ className, children }: PropsWithChildren<{className?: String}>) => {
  return (
    <div className={`rounded-3xl px-10 py-4 drop-shadow-xl bg-white ${className}`}>
      {children}
    </div>
  );
};

export default Card;