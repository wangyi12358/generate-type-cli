import { ApiFile, Enum, EnumMember, Interface, InterfaceModule, PropertySignature } from '../apiInterface';
import { getType, renderComment, renderImport } from './utils';

export function renderEnum(list: Enum[]) {
  const renderMembers = (member: EnumMember) => {
    if (member.initializer && isNaN(member.initializer as number)) {
      return `${renderComment(member.comment)}${member.name} = '${
        member.initializer
      }'`;
    } else {
      return `${renderComment(member.comment)}${member.name}`;
    }
  };

  return list
    .map(
      (k) => `${renderComment(k.comment)}enum ${k.name} {
        ${k.members.map((m) => renderMembers(m)).join(',\n')}
    }`
    )
    .join('\n');
}

export function renderInterfaceModule(
  list: InterfaceModule[],
  messageMap: { [key: string]: 1 }
) {
  return list
    .map(
      (k) => `${renderComment(k.comment)}namespace ${k.name}{
        ${renderEnum(k.enums)}

        ${renderInterface(k.interfaces, messageMap)}
      }`
    )
    .join('\n');
}

/**
 * 生成ts的原始类型，方便后续做扩展
 * @param k
 * @returns
 */
const getComponentByPropertySignature = (
  k: PropertySignature,
  tsType: string
) => {
  let comment = k.comment || '';
  if (k.defaultValue) {
    comment += '@default=' + k.defaultValue;
  }
  if (tsType !== k.propertyType.type) {
    comment += ' @' + k.propertyType.type;
  }
  return comment;
};

export const renderPropertySignature = (
  ps: PropertySignature[],
  messageMap: { [key: string]: 1 }
) => {
  return ps
    .map((k) => {
      const name = k.jsonName ? k.jsonName : k.name;
      const type = getType(k.propertyType);
      let optional = k.optional;
      if (k?.comment?.match(/optional/)) {
        optional = true;
      }
      return `${renderComment(
        getComponentByPropertySignature(k, type)
      )}${name}${optional ? '?' : ''} : ${k.repeated ? type + '[]' : type};`;
    })
    .join('\n');
};

export function renderInterface(
  list: Interface[],
  messageMap: { [key: string]: 1 }
) {
  return list
    .map((k) => {
      let str = '';
      if (k.module) {
        str = renderInterfaceModule([k.module], messageMap);
      }
      str += `${renderComment(k.comment)}export interface ${k.name}{
          ${renderPropertySignature(k.members, messageMap)}
      }`;
      return str;
    })
    .join('\n\n');
}

export function genType(
  apiInfo: ApiFile,
  messageMap: { [key: string]: 1 }
) {
  return `${renderImport(apiInfo.imports, messageMap)}
  ${renderEnum(apiInfo.enums)}
  ${renderInterface(apiInfo.interfaces, messageMap)}
  `;
}