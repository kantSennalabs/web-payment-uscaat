import { NextResponse } from 'next/server';
import db from '@/app/db';
import { Picture } from '@/app/db/entity/Picture';
import { getBase64FromDatabase } from '@/app/util/base64';

import * as fs from 'fs';

type Params = {
  picture_id: string;
};

export async function GET(req: Request, context: { params: Params }) {
  try {
    if (!db.isInitialized) {
      await db.initialize();
    }
    const picture_id = Number(context.params.picture_id);
    const pictureRepository = db.getRepository(Picture);
    const foundPicture: any = await pictureRepository.findOneBy({
      picture_id,
    });
    if (!foundPicture) {
      return NextResponse.json('Picture Not Found', { status: 404 });
    }
    // const newPic = await getBase64FromDatabase(
    //   'data:image/jpeg;base64',
    //   foundPicture.picture as ArrayBuffer
    // );
    return NextResponse.json(foundPicture.picture.toString('base64'), {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
    // return NextResponse.json(foundPicture.picture);
    // const picture = fs.readFileSync(
    //   `public/event/${context.params.picture_id}`
    // );
    // return NextResponse.json(
    //   'data:image/webp;base64,' + picture.toString('base64'),
    //   {
    //     headers: {
    //       'Content-Type': 'image/jpeg',
    //     },
    //   }
    // );
  } catch (error) {
    console.error(error);
    return NextResponse.json('Database Error', { status: 507 });
  } finally {
    // await db.destroy();
  }
}
