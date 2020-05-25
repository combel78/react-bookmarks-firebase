import React, { ChangeEvent } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, makeStyles, Theme, createStyles, FormControl, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            marginTop: theme.spacing(2),
        },
        formElement: {
            marginBottom: theme.spacing(2),
        },
    }),
);

interface BookmarkEditFormProps {
    open: boolean,
    bookmark: BookmarkType,
    onClose: any,
    onSave: any,
    onDelete?: any
}

const BookmarkEditForm: React.FC<BookmarkEditFormProps> = (bookmarkEditFormProps) => {

    const classes = useStyles();

    const [inputName, setInputName] = React.useState(bookmarkEditFormProps.bookmark.name);

    
    const [inputUrl, setInputUrl] = React.useState(bookmarkEditFormProps.bookmark.url);
    const [inputDescription, setInputDescription] = React.useState(bookmarkEditFormProps.bookmark.description);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        switch (e.target.id) {
            case 'bookmark_name': {
                setInputName(e.target.value);
                break;
            }
            case 'bookmark_url': {
                setInputUrl(e.target.value);
                break;
            }
            case 'bookmark_description': {
                setInputDescription(e.target.value);
                break;
            }
        }
    }

    const handleCancel = () => {
        bookmarkEditFormProps.onClose();
    }

    const handleSave = () => {
        const saveObject: BookmarkType = {
            id: bookmarkEditFormProps.bookmark.id,
            name: inputName,
            url: inputUrl,
            description: inputDescription
        }
        bookmarkEditFormProps.onSave(saveObject);
    }

    const handleDelete = () => {
        bookmarkEditFormProps.onDelete(bookmarkEditFormProps.bookmark);
    }

    return (
        <div>
            <Dialog open={bookmarkEditFormProps.open} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Bookmark bearbeiten</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bitte hier die Informationen zur Bookmark eingeben.
                    </DialogContentText>
                    <FormControl className={classes.formControl} fullWidth>
                        <TextField
                            id="bookmark_name"
                            className={classes.formElement}
                            label="Name" value={inputName}
                            onChange={handleChange}
                            autoFocus
                            fullWidth />
                        <TextField id="bookmark_url"
                            className={classes.formElement}
                            label="URL"
                            value={inputUrl}
                            onChange={handleChange}
                            fullWidth />
                        <TextField
                            id="bookmark_description"
                            className={classes.formElement}
                            label="Beschreibung"
                            value={inputDescription}
                            onChange={handleChange}
                            multiline
                            rows="2"
                            fullWidth />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    {bookmarkEditFormProps.onDelete !== undefined &&
                        <IconButton size="small" color="secondary" onClick={handleDelete} >
                            <DeleteIcon />
                        </IconButton>
                    }
                    <Button color="primary" onClick={handleCancel}>
                        Abbrechen
                    </Button>
                    <Button variant="contained" autoFocus  color="secondary" onClick={handleSave}>
                        Speichern
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BookmarkEditForm;