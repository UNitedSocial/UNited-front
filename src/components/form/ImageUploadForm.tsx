import React, { useState } from 'react';
import {
    Alert,
    Autocomplete,
    Box,
    Button, Checkbox, Chip, CircularProgress,
    FormControl, FormControlLabel,
    Grid, InputAdornment,
    InputLabel,
    MenuItem,
    Select, Snackbar,
    TextField,
    Typography
} from "@mui/material";

type ImageUploadFormProps = {
  onSubmit: (image: File) => void;
};

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ onSubmit }) => {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('Por favor, selecciona una imagen');
      return;
    }
    onSubmit(file);
    setFile(null);
    setImagePreview(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="image-upload">Selecciona una imagen:</label>
      <input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} />
      {imagePreview && <img src={imagePreview} alt="Preview" />}
      {error && <div>{error}</div>}      
      <Button type="submit" variant="contained" sx={{mt: 4}} color="primary">Subir</Button>
    </form>
  );
};

export default ImageUploadForm;

