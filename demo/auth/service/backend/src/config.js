import { secp256k1 as curve } from 'noise-curve-tiny-secp';
import { didKeyFromPubKey } from '@synonymdev/slashtags-auth';

export const serverKeyPair = curve.generateSeedKeyPair('server keys');

/** @type {Profile} */
export const serverProfile = {
  id: didKeyFromPubKey(serverKeyPair.publicKey),
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Slashtags Demo',
  image:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAIdQTFRFFRcYSDQb7pQj65IjoWgf0IMh2ogimmMfFhcY7ZMjX0Ic6ZEjsXEgxXwh4Y0iiFkeLiUZdE4dvnkhuHUg55AjaUccQDAaqm0gzYEhIB0ZflMdLyYZ3YoixHwhqGwf1IUiQTAaXUEc5pAjMCcZkF4eUzsb6JEjz4IhRTIayn8h5I4i6pEj7JMjf117qgAAA/FJREFUeJzt3WlOlVEQhGG4gMwziOAACKio+1+fO+icqnQ6FfM+C6ik/5Dcok9/W1sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzZ3uh2BvOi7BrD7Q3mRflgDLc/mJfk4NAYbnsuL8qRMdvxYF6UE2O408G8KGfGcOeDeVGM2TYXg3lJLo3ZzgbzolwZw10P5kW5MYa7HcxL8tGY7XAwL8q+MdyHwbwoe8Zwu4N5SQ52jOGq3zrNeVGc3yZVndKdF+XOGO7TYF4Up06pfpt05yW5N2arfpt050VxfpvcDOZFuTaGuxrMi+LUKZeDeUmsPzH3c3lRHozZqjqlOy/KqTFcVad050Vx6pTqT0x3XpLPxmzVn5juvCjnxmxfBvOifDWG+zaYF+XYGO5oMC+Js+2yOZjLi+I0wI+DeVEejeGqbZfuvCQHxmybp7m8KM/GbN8H86KwPSNge2YdjbKAekZAPSNge2bdizFbte3SnRfl1Riu2nbpzovibLvcDeZFcbZd3gbzkvC4ScDjJgGPm9ZRzwicOuXHYF4U6hkB9cw66hkBj5sEPG4SsD2z7sKYrdp26c6LQj0joJ4RUM+so54RUM8IqGfWUc8Ibo3ZqsdI3XlRqGcE1DPrqGcEbM8I2J4RsD2zzqpTis3+7rwo1DOCn8Zw1WOk7rwo1DPr3ozZqjqlOy+KcyumqlO686I4dcrrYF4SfusIuD0j4PaMgNsz6zjkIHAOL1R1SndeFKdOORnMi+LUKdXhhe68JL+M2Q6LOqU7LwqngQWcBhZ0n/L9n08DU88IqGcEbM+ss7609GsuL4pzfbyqU7rzorA9I2B7Zp3VAH+ey4vC4yYBj5sEbM+sY3tGwPaMgHpGQD2zjnpG8M0Y7udgXhS2Z9axPSNge0bA9oyA7Zl1HHIQsD0jYHtGwPbMuidjtqpO6c6LwvaMgHpmHR/WFvBhbYGz7fI+mBflizFc9a/j7rwk1DMC6hkB9YzgtzFcVad05yWhnhHwlVqBU6dUdzG786L8MYZ7HsxLwldqBXylVuDUKdVmf3deEuoZAfWMgHpGQD0jMGbbvAzmJaGeEVDPCKhn1lHPCKhnBO/GcFWd0p0XhXpmnVOnVLdiuvOisD0jYHtGwOOmdTxuEnB7RsDtmXV8uUnAl5sETp1S3YrpzoviPEZ6GMxLQj0j4MtNAr7cJOD2zDpuzwi4PSPgw9oCvty0jnpGQD0j4PaMwDnlW227dOcloZ4RsD0jYHtm3Ysx22YwLwrbMwK2ZwTOb5PqVkx3XhK2ZwQ8bhKwPSP4awxXbbt05wEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0O0fRTK/ASREQ6oAAAAASUVORK5CYII=',
  url: 'www.synonym.to',
  description: 'Web of trust for all',
  extraShit: {
    nanana: 'bobobo',
  },
};

/** @typedef {import ('@synonymdev/slashtags-auth').Profile} Profile */
