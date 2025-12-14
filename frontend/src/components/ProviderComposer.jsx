import React from 'react';

const ProviderComposer = ({ contexts, children }) => {
  return contexts.reduceRight((acc, Context) => {
    return <Context>{acc}</Context>;
  }, children);
};

export default ProviderComposer;
