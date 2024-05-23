import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import { Linking } from 'react-native';

export const ParseConversationId = (array: string[]) => {
  const newArray = [...array];
  return newArray.sort().join('-');
}


export const downloadAndOpenPDF = async (base64: string, mimetype: string, fileName: string) => {
  const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
  if (!permissions.granted) {
    return;
  }

  try {
    await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, mimetype)
      .then(async (uri) => {
        await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });

        const canOpen = await Linking.canOpenURL(uri);
        if (!canOpen) {
          throw new Error('Unable to open file');
        }

        Linking.openURL(uri);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    throw new Error(e);
  }
}